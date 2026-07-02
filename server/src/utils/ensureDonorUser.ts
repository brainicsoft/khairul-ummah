import crypto from 'crypto';
import { Types } from 'mongoose';
import { User } from '../modules/user/user.model';
import { normalizePhone } from './normalizePhone';

export type DonorPayload = {
  name: string;
  phone?: string;
  email?: string;
};

export const ensureDonorUser = async (payload: DonorPayload) => {
  if (!payload.phone?.trim()) {
    return null;
  }

  const normalized = normalizePhone(payload.phone);
  const phoneDigits = normalized.replace(/\D/g, '');

  if (!phoneDigits || phoneDigits.length < 10) {
    return null;
  }

  let user = await User.findOne({ phone: normalized });

  if (user) {
    if (payload.name?.trim() && user.name !== payload.name.trim()) {
      user.name = payload.name.trim();
      await user.save();
    }
    return user;
  }

  const email =
    payload.email?.trim() && !payload.email.includes('@donor.kuf.org.bd')
      ? payload.email.trim()
      : `${phoneDigits}@donor.kuf.org.bd`;
  const username = `donor_${phoneDigits}`;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    if (!existingEmail.phone) {
      existingEmail.phone = normalized;
      await existingEmail.save();
    }
    return existingEmail;
  }

  const existingUsername = await User.findOne({ username });
  const finalUsername = existingUsername
    ? `donor_${phoneDigits}_${Date.now().toString().slice(-4)}`
    : username;

  user = await User.create({
    name: payload.name?.trim() || 'Donor',
    username: finalUsername,
    email,
    phone: normalized,
    password: crypto.randomBytes(24).toString('hex'),
    profileCompleted: false,
    role: 'user',
  });

  return user;
};

export const linkDonationToUser = async (
  userId: Types.ObjectId | string,
  phone: string,
) => {
  const normalized = normalizePhone(phone);
  if (!normalized) return;

  const Payment = (await import('../modules/payment/payment.model')).default;
  const { Autopay } = await import('../modules/autopay/autopay.model');

  const phoneDigits = normalized.replace(/\D/g, '').slice(-10);
  const phoneFilter = {
    $or: [
      { phone: normalized },
      { phone: `0${phoneDigits}` },
      { phone: `880${phoneDigits}` },
      { phone: { $regex: `${phoneDigits}$` } },
    ],
  };

  await Promise.all([
    Payment.updateMany({ ...phoneFilter, userId: { $exists: false } }, { userId, phone: normalized }),
    Autopay.updateMany({ ...phoneFilter, userId: { $exists: false } }, { userId, phone: normalized }),
  ]);
};

export const ensureDonorFromPayment = async (payload: DonorPayload) => {
  const user = await ensureDonorUser(payload);
  if (!user || !payload.phone) return null;

  await linkDonationToUser(user._id, payload.phone);
  return user;
};
