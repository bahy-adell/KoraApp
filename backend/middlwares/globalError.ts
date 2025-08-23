import { Request, Response, NextFunction } from "express";
import customErrors from "./Errors";
export const errorMiddleware = (err: any,req: Request,res: Response,next: NextFunction): void => {
  
  if (err instanceof customErrors) {
    // res.status(err.statusCode).json(err.toJSON());

    const errorMessage = req.t(err.message) || err.message;
    res.status(err.statusCode).json({
      success: false,
      status: "error",
      statusCode: err.statusCode,
      message: errorMessage
    });
  } else {
    res.status(500).json({
      success: false,
      status: "error",
      statusCode: 500,
      message: req.t('internal_server_error') || "Internal server error"
    });
  }
};
