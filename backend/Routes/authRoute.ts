import { Router } from "express";
import { signup, login , forgetPassword , verifyResetCode , resetPassword} from "../controllers/authController";
import { loginValidator, signupValidator  } from "../validators/auth";
import validatorMiddleware from "../middlwares/validatorMiddleware";

const authRoute: Router = Router();
authRoute.route('/signup').post(signupValidator, validatorMiddleware,signup);
authRoute.route('/login').post(loginValidator,validatorMiddleware, login);
authRoute.route('/forget-password').post(validatorMiddleware,forgetPassword);
authRoute.route('/verify-reset-code').post(validatorMiddleware, verifyResetCode);
authRoute.route('/reset-password').post(validatorMiddleware, resetPassword);
export default authRoute;