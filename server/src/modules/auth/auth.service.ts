import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { CustomError } from '../../errors/CustomError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILogin, TJwtPayload } from './auth.interface';
import { genarateToken } from '../../utils/genarateToken';

import {
  access_token,
  access_token_expiry,
  refresh_token,
  refresh_token_expiry,
} from '../../config';
import { activationCode } from './auth.utils';
import { sendMail } from '../../utils/emailSender';
import { normalizePhone } from '../../utils/normalizePhone';

export const prepareForActivateService = async (payload: IUser) => {
  if (await User.isUserExists(payload)) {
    throw new CustomError(404, 'User Already Exists');
  }

  const { code, token } = activationCode(payload);

  await sendMail(payload.email, 'Account Activation ', { ...payload, code });

  return {
    code,
    token,
  };
};

export const createUserService = async (payload: IUser) => {
  if (await User.isUserExists(payload)) {
    throw new CustomError(404, 'User Already Exists');
  }
  const result = await User.create(payload);

  const jwtPayload: TJwtPayload = {
    name: result.name,
    email: result.email,
    role: result.role,
    username: result.username,
    userId: result._id,
  };
  const token = genarateToken(jwtPayload, access_token, access_token_expiry);
  return {
    result,
    token,
  };
};

export const checkPhoneExistsService = async (phone: string) => {
  const normalized = normalizePhone(phone);

  if (!normalized || normalized.length < 11) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Invalid phone number');
  }

  const user = await User.findOne({ phone: normalized });

  return {
    exists: !!user,
    phone: normalized,
    needsPassword: user ? !user.profileCompleted : false,
  };
};

export const createDonorProfileService = async (payload: {
  name: string;
  phone: string;
  email?: string;
  password: string;
}) => {
  const normalized = normalizePhone(payload.phone);

  if (!normalized || normalized.length < 11) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Invalid phone number');
  }

  const existingByPhone = await User.findOne({ phone: normalized });
  if (existingByPhone) {
    if (!existingByPhone.profileCompleted) {
      existingByPhone.password = payload.password;
      existingByPhone.profileCompleted = true;
      if (payload.name?.trim()) {
        existingByPhone.name = payload.name.trim();
      }
      if (
        payload.email?.trim() &&
        !payload.email.includes('@donor.kuf.org.bd')
      ) {
        existingByPhone.email = payload.email.trim();
      }
      await existingByPhone.save();

      const jwtPayload: TJwtPayload = {
        userId: (existingByPhone as any)._id,
        email: existingByPhone.email,
        name: existingByPhone.name,
        role: existingByPhone.role,
        username: existingByPhone.username,
      };

      const accessToken = genarateToken(
        jwtPayload,
        access_token,
        access_token_expiry,
      );
      const refreshToken = genarateToken(
        jwtPayload,
        refresh_token,
        refresh_token_expiry,
      );

      const { password, ...rest } = existingByPhone.toObject();
      return { accessToken, refreshToken, rest };
    }

    throw new CustomError(httpStatus.CONFLICT, 'Phone already registered');
  }

  const phoneDigits = normalized.replace(/\D/g, '');
  const email = payload.email?.trim() || `${phoneDigits}@donor.kuf.org.bd`;
  const username = `donor_${phoneDigits}`;

  if (await User.isUserExists({ email, username, phone: normalized })) {
    throw new CustomError(httpStatus.CONFLICT, 'User already exists');
  }

  const user = await User.create({
    name: payload.name.trim(),
    username,
    email,
    phone: normalized,
    password: payload.password,
    profileCompleted: true,
    role: 'user',
  });

  const jwtPayload: TJwtPayload = {
    userId: (user as any)._id,
    email: user.email,
    name: user.name,
    role: user.role,
    username: user.username,
  };

  const accessToken = genarateToken(
    jwtPayload,
    access_token,
    access_token_expiry,
  );

  const refreshToken = genarateToken(
    jwtPayload,
    refresh_token,
    refresh_token_expiry,
  );

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...rest } = user.toObject();

  return {
    accessToken,
    refreshToken,
    rest,
  };
};

export const loginService = async (payload: ILogin) => {
  const identifier = payload.email.trim();
  const normalized = normalizePhone(identifier);
  const orConditions: Record<string, string>[] = [{ email: identifier }];

  if (normalized.length >= 11) {
    orConditions.push({ phone: normalized });
  }

  const user = await User.findOne({ $or: orConditions }).select('+password');

  // Check User Exist Or not
  if (!user) {
    throw new CustomError(404, 'User not exists please create an account');
  }
  //   Check User Is Deleted Or not
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Already Deleted User');
  }
  //   check Passsword Is Valid or Not

  const isPasswordValid = (user as any).comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Invalid UserID or Password');
  }
  const jwtPayload: TJwtPayload = {
    userId: (user as any)._id,
    email: user.email,
    name: user.username,
    role: user.role,
    username: user.username,
  };

  //   now Need to make AccessToken and RefreshToken

  const accessToken = genarateToken(
    jwtPayload,
    access_token,
    access_token_expiry,
  );

  const refreshToken = genarateToken(
    jwtPayload,
    refresh_token,
    refresh_token_expiry,
  );

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...rest } = user.toObject();
  return {
    accessToken,
    refreshToken,
    rest,
  };
};

export const refreshTokenService = async (token: string) => {
  const decoded = jwt.verify(token, refresh_token) as JwtPayload;

  const { email, userId } = decoded;

  let user = userId ? await User.findById(userId) : null;

  if (!user && email) {
    user = await User.isUserExists({ email });
  }

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const jwtPayload: TJwtPayload = {
    userId: (user as any)._id,
    email: user.email,
    name: user.username,
    role: user.role,
    username: user.username,
  };

  const accessToken = genarateToken(
    jwtPayload,
    access_token,
    access_token_expiry,
  );

  return accessToken;
};

//   Forget And Reset Password

export const forgetPasswordService = async (payload: Partial<IUser>) => {
  const user = await User.isUserExists(payload);
  if (!user) {
    throw new CustomError(404, 'User Not Found');
  }
  const jwtPayload: TJwtPayload = {
    userId: (user as any)._id,
    email: user.email,
    name: user.username,
    role: user.role,
    username: user.username,
  };

  const resetToken = genarateToken(
    jwtPayload,
    access_token,
    access_token_expiry,
  );
  // const resetUILink = `reset-password?email=${user.email}&token=${resetToken} `
  await sendMail(
    payload.email,
    'Password Reset',
    { ...payload, token: resetToken },
    'reset',
  );
  return resetToken;
};

// Password Resetting Service

export const resetPasswordPasswordService = async (
  token: string,
  payload: Partial<IUser>,
) => {
  const decoded: Partial<IUser & JwtPayload> = jwt.verify(
    token,
    access_token,
  ) as JwtPayload;

  await User.updatePassword(decoded.email as string, payload);
};
export const changePasswordService = async (
  userData: Partial<IUser> | JwtPayload,
  payload: any,
) => {
  const payData: Partial<IUser> = {
    email: userData.email,
  };
  const user = await User.findOne({ email: payData.email }).select('+password');
  // Check User Exist Or not
  if (!user) {
    throw new CustomError(404, 'User not exists please create an account');
  }
  //   Check User Is Deleted Or not

  //   check Passsword Is Valid or Not

  const isPasswordValid = (user as any).comparePassword(payload.oldPassword);

  if (!isPasswordValid) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Invalid UserID or Password');
  }

  await User.updatePassword((user as any).email as string, payload);
};
