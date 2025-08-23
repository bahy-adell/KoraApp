import { Router } from "express";
import { signup, login , forgetPassword , verifyResetCode , resetPassword} from "../controllers/authController";
import { loginValidator, signupValidator  } from "../validators/auth";
import validatorMiddleware from "../middlwares/validatorMiddleware";

const test: Router = Router();
test.route('/').get((req, res) => {
  res.send("API is running...");
});

export default test;