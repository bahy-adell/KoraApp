import { RequestHandler } from "express";
import { check } from "express-validator";
import usersModel from "../Models/userModel";
import validatorMiddleware from "../middlwares/validatorMiddleware";

export const signupValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('user_name_required')
    .isLength({ min: 5, max: 20 }).withMessage('name_length'),
  check('email')
    .notEmpty().withMessage('email_required')
    .isEmail().withMessage('invalid_email')
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) { throw new Error(`email_exists`) }
      return true;
    }),
  check('password')
    .notEmpty().withMessage('password_required')
    .isLength({ min: 6, max: 20 }).withMessage('password_length')
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) { throw new Error("passwords_not_match") }
      return true
    }),
  check('confirmPassword')
    .notEmpty().withMessage('confirm_password_required')
    .isLength({ min: 6, max: 20 }).withMessage('confirm_password_length'),
  validatorMiddleware
]

export const loginValidator: RequestHandler[] = [
  check('email')
    .notEmpty().withMessage('login_email_required')
    .isEmail().withMessage('login_invalid_email'),
  check('password')
    .notEmpty().withMessage('login_password_required'), 
    validatorMiddleware
]