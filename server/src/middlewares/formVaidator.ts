import { RequestHandler } from 'express';

export const formValidator: RequestHandler = (req, _res, next) => {
  console.log(req.body)
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }

  next();
};