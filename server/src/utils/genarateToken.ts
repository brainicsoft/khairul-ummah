import jwt, { SignOptions  } from "jsonwebtoken";
import { TJwtPayload } from "../modules/auth/auth.interface";

export const genarateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn:  any
): string => {
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
};