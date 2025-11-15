/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrors } from '../interfaces/error.interface';
import { handleZodError } from '../errors/zodError';
import { CustomError } from '../errors/CustomError';
import { NODE_ENV } from '../config';
import {
  mongooseCastError,
  mongooseValidationError,
} from '../errors/validation.mongoose.error';
import { handleDuplicateError } from '../errors/duplicateErrors';

/**
 * =========================== === === Global Error === === =====================
 */

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  console.log(error)
  let status = 500;
  let message = 'Something went wrong';
  const success = false;
  let stackTrace: any = NODE_ENV === 'development' ? error.stack : null;
  let errors: TErrors = [
    {
      path: req.url,
      message: 'Something went wrong',
    },
  ];
  /**
   * =========================== === === Custom  Error === === =====================
   */

  //  Final Error

  if (error instanceof Error) {
    message = error.message;
    errors = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  if (error instanceof CustomError) {
    status = error.status;
    message = error.message;
    errors = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  /**
   * =========================== === === CAST  Error === === =====================
   */

  if (error.name === 'CastError') {
    status = 400;
    message = `Invalid ID`;
    const simplified = mongooseCastError(error);
    errors = simplified;
  }

  /**
   * =========================== === === Zod  Error === === =====================
   */

/* inside your errorHandler */
if (error instanceof ZodError) {
  status = 400;
  message = "Validation Error";
  stackTrace = error.stack ? { ...stackTrace, stack: error.stack } : stackTrace;

  // Convert Zod issues to TErrors safely
  errors = error.issues.map((issue) => {
    const path = issue.path
      .map((p) => (typeof p === "symbol" ? p.toString() : p)) // convert symbol to string
      .join(".") || "body"; // fallback if path is empty

    return {
      path,
      message: issue.message,
    };
  }) as TErrors;
}

  /**
   * =========================== === === MOngoose   Error === === =====================
   */

  if (error.name === 'ValidationError') {
    status = 400;
    message = `Validation Error`;
    const simplified = mongooseValidationError(error);
    errors = simplified;
  }

  if (error.code === 11000) {
    status = 400;
    message = `Data Duplication Error`;
    const simplified = handleDuplicateError(error);
    errors = simplified;
  }

  return res
    .status(status)
    .json({ status, success, message, errors, error, stackTrace });
};
