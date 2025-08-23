import Jwt from "jsonwebtoken";

const expiresIn = process.env.JWT_EXPIRED_TIME ;
export const createToken = (payload: any , role: string) => Jwt.sign(
    { _id: payload , role : role},
    process.env.JWT_SECRET_KEY!,
    {expiresIn: '1d'}
);

export const createResetToken = (payload: any) => Jwt.sign(
    { _id: payload },
     process.env.JWT_SECRET_KEY!,
      { expiresIn: '1d' }
    )