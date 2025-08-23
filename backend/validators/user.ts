import { RequestHandler } from "express";
import { check } from "express-validator";

export const updateProfileValidator: RequestHandler[] = [
  check('name')
    .optional()
    .isLength({ min: 5, max: 20 })
    .withMessage('name_length'),
  check('phoneNum')
    .optional()
    .isMobilePhone('any')
    .withMessage('invalid_phone_number')
]; 