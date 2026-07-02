import { CustomError } from '../../errors/CustomError';
import { IUser } from './user.interface';
import { User } from './user.model';
import Payment from '../payment/payment.model';
import { Autopay } from '../autopay/autopay.model';
import { getAutopayCharges } from '../autopay/autopayCharge.service';
import { normalizePhone } from '../../utils/normalizePhone';
import { linkDonationToUser } from '../../utils/ensureDonorUser';
import httpStatus from 'http-status';

const buildPhoneFilter = (phone: string) => {
  const normalized = normalizePhone(phone);
  const last10 = normalized.replace(/\D/g, '').slice(-10);

  if (!last10) return null;

  return {
    $or: [
      { phone: normalized },
      { phone: `0${last10}` },
      { phone: `880${last10}` },
      { phone: `88${last10}` },
      { phone: { $regex: `${last10}$` } },
    ],
  };
};

const resolveUserPhone = (user: IUser & { _id: unknown }) => {
  if (user.phone?.trim()) {
    return normalizePhone(user.phone);
  }

  const donorEmailMatch = user.email?.match(/^(\d{10,})@donor\.kuf\.org\.bd$/);
  if (donorEmailMatch?.[1]) {
    return normalizePhone(donorEmailMatch[1]);
  }

  return null;
};

const isActiveRecurringStatus = (status?: string) => {
  const normalized = (status || '').toLowerCase();
  return normalized === 'activated' || normalized === 'active';
};

export const getMyDonationsService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'User not found');
  }

  const resolvedPhone = resolveUserPhone(user);

  if (resolvedPhone && !user.phone) {
    user.phone = resolvedPhone;
    await user.save();
  }

  if (!resolvedPhone) {
    return {
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        profileCompleted: user.profileCompleted ?? false,
      },
      summary: {
        totalOneTime: 0,
        oneTimeCount: 0,
        recurringCount: 0,
        activeRecurringCount: 0,
        totalActiveRecurringAmount: 0,
      },
      oneTimePayments: [],
      recurringSubscriptions: [],
      activeRecurringSubscriptions: [],
    };
  }

  await linkDonationToUser(user._id, resolvedPhone);

  const phoneFilter = buildPhoneFilter(resolvedPhone);
  if (!phoneFilter) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Invalid phone number');
  }

  const donationQuery = {
    $or: [{ userId: user._id }, phoneFilter],
  };

  const [oneTimePayments, recurringSubscriptions] = await Promise.all([
    Payment.find({ ...donationQuery, status: 'success' })
      .sort({ createdAt: -1 })
      .lean(),
    Autopay.find(donationQuery).sort({ createdAt: -1 }).lean(),
  ]);

  const activeRecurringSubscriptions = recurringSubscriptions.filter((item) =>
    isActiveRecurringStatus(item.status),
  );

  const totalOneTime = oneTimePayments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0,
  );

  const totalRecurringMonthly = activeRecurringSubscriptions.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  return {
    user: {
      name: user.name,
      phone: resolvedPhone,
      email: user.email,
      profileCompleted: user.profileCompleted ?? false,
    },
    summary: {
      totalOneTime,
      oneTimeCount: oneTimePayments.length,
      recurringCount: recurringSubscriptions.length,
      activeRecurringCount: activeRecurringSubscriptions.length,
      totalActiveRecurringAmount: totalRecurringMonthly,
    },
    oneTimePayments,
    recurringSubscriptions,
    activeRecurringSubscriptions,
  };
};

export const getUserService = async (id: string) => {
  if (!id) {
    throw new CustomError(404, 'user Not Found');
  }

  const result = await User.findById(id);
  return result;
};

export const updateMyProfileService = async (
  userId: string,
  payload: { name?: string; email?: string },
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updates: Partial<IUser> = {};

  if (payload.name?.trim()) {
    updates.name = payload.name.trim();
  }

  if (payload.email?.trim()) {
    const email = payload.email.trim();
    const existing = await User.findOne({ email, _id: { $ne: userId } });
    if (existing) {
      throw new CustomError(httpStatus.CONFLICT, 'Email already in use');
    }
    updates.email = email;
  }

  if (!Object.keys(updates).length) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'No valid fields to update');
  }

  const result = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const updateUserService = async (id: string, data: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const assertSubscriptionOwnership = async (
  userId: string,
  subscriptionMongoId: string,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'User not found');
  }

  const resolvedPhone = resolveUserPhone(user);
  const phoneFilter = resolvedPhone ? buildPhoneFilter(resolvedPhone) : null;

  const ownershipQuery = phoneFilter
    ? { _id: subscriptionMongoId, $or: [{ userId: user._id }, phoneFilter] }
    : { _id: subscriptionMongoId, userId: user._id };

  const subscription = await Autopay.findOne(ownershipQuery).lean();

  if (!subscription) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Subscription not found');
  }

  return { user, subscription };
};

export const getSubscriptionDetailService = async (
  userId: string,
  subscriptionMongoId: string,
) => {
  const { subscription } = await assertSubscriptionOwnership(
    userId,
    subscriptionMongoId,
  );

  const payments = await getAutopayCharges(String(subscription._id));

  return {
    subscription,
    payments,
    summary: {
      totalPaid: payments
        .filter((item) => item.status === 'success')
        .reduce((sum, item) => sum + (item.amount || 0), 0),
      paymentCount: payments.length,
      isActive: isActiveRecurringStatus(subscription.status),
    },
  };
};

export const cancelSubscriptionDemoService = async (
  userId: string,
  subscriptionMongoId: string,
) => {
  const { subscription } = await assertSubscriptionOwnership(
    userId,
    subscriptionMongoId,
  );

  if (!isActiveRecurringStatus(subscription.status)) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'Only active subscriptions can be cancelled',
    );
  }

  const updated = await Autopay.findByIdAndUpdate(
    subscription._id,
    {
      status: 'deactive',
      gatewayResponse: {
        ...(typeof subscription.gatewayResponse === 'object'
          ? subscription.gatewayResponse
          : {}),
        demoCancelledAt: new Date().toISOString(),
        demoCancelNote:
          'Demo cancel — bKash subscription API not called yet',
      },
    },
    { new: true },
  ).lean();

  return {
    subscription: updated,
    demo: true,
    message:
      'Demo: subscription marked deactive in our database. bKash cancel API will be wired in production.',
  };
};
