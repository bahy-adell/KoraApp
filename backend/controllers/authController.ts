import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../Models/userModel';
import { Users } from '../Interfaces/userInterface';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import customErrors from '../middlwares/Errors';
import { createToken , createResetToken} from '../middlwares/Token';
import Jwt  from 'jsonwebtoken';
import sendMail from '../middlwares/sendMails';
import { newRequest } from '../Interfaces/req';

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user: Users = await usersModel.create(req.body);
  res.status(201).json({data: user })
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new customErrors(req.t("invalid_email_or_password"), 401));
  }
  const token = createToken(user._id, user.role);
  res.status(200).json({ token, message: req.t("login_success") });
});


export const forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user) { return next(new customErrors('user not found', 404)) };
  const resetCode: string = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
  user.resetCodeExpireTime = Date.now() + (5 * 60 * 1000);
  user.resetCodeVerify = false;
  const message: string = `your reset password code is ${resetCode}`
  try {
    await sendMail({ email: user.email, subject: 'Reset Password', message });
    await user.save({ validateModifiedOnly: true });
  } catch (err) {
    console.log(err);
    return next(new customErrors('error sending email', 400))
  }
  const resetToken: string = createResetToken(user._id);
  res.status(200).json({ message: 'reset password code sent to your email', resetToken })
});

export const verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else { return next(new customErrors('get your reset code first', 400)) }
  const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_SECRET_KEY!);
  const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
  const user = await usersModel.findOne({
    _id: decodedToken._id,
    resetCode: hashedResetCode,
    resetCodeExpireTime: { $gt: Date.now() }
  })

  if (!user) { return next(new customErrors('invalid or expired reset code', 400)) };
  user.resetCodeVerify = true;
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'reset code verified' });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else { return next(new customErrors("you can't do this action", 400)) }
  const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_SECRET_KEY!);
  const user = await usersModel.findOne({
    _id: decodedToken._id,
    resetCodeVerify: true
  })
  if (!user) { return next(new customErrors('verify your reset code first', 400)) };
  user.password = req.body.password;
  user.resetCode = undefined;
  user.resetCodeExpireTime = undefined;
  user.resetCodeVerify = undefined;
  user.passwordChangedAt = Date.now();
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'your password has been changed' });
});




// interface newRequest extends Request { user?: Users; }
export const protectRoute = asyncHandler(async (req:newRequest, res: Response, next: NextFunction): Promise <any> => {
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else { return next(new customErrors(req.t("login_required"), 401)) }
    
    const decodedToken: any = Jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) { return next(new customErrors(req.t("user_not_exist"), 401)) }

    req.user = currentUser;
    next();
});

export const allowedTo = (...roles: string[]) => asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  if (!(roles.includes(req.user?.role!))) {
    return next(new customErrors(req.t("unauthorized_access"), 403))
  }
  next();
});