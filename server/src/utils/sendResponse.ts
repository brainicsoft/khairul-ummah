import { Response } from 'express';

interface IResponse<T> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  meta?: { page: number; limit: number; total: number; totalPage: number };
}

export const sendResponse = <T>(
  res: Response,
  { data, message, status, success, token,meta }: IResponse<T>,
) => {
  return res.status(status).json({
    status,
    success,
    message,
    data,
    token,
    meta,
  });
};
