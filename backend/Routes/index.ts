import { Application, Request, Response, NextFunction } from "express";
import customErrors from "../middlwares/Errors";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import test from "./test";


const AllRoutes = (app: Application): void => {
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/users', userRoute);
    app.use("/", test)
 

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new customErrors(`The router ${req.originalUrl} is not found`, 400));
    })
  }
  
  export default AllRoutes;
