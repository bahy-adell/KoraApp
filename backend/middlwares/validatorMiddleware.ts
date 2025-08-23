import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const validatorMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction):void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
  {
    const translatedErrors = errors.array().map((err: any) => (
    {
      field: err.param,
      message: req.t(err.msg) || err.msg
    }));
     res.status(400).json({ errors: translatedErrors });
     return;

  } else
  {
    next();
  }
};

export default validatorMiddleware;