import { Router } from "express";
import validatorMiddleware from "../middlwares/validatorMiddleware";
import { getUsers, getUser, updateUser, changeUserRole, deleteUser } from '../controllers/userController';
import { upload } from '../middlwares/multer';
import { protectRoute } from '../controllers/authController';
const userRoute: Router = Router();
userRoute.route('/getAll').get(protectRoute,validatorMiddleware,getUsers);
userRoute.route('/getone').get(protectRoute,validatorMiddleware,getUser);
userRoute.route('/update').put(protectRoute,validatorMiddleware,upload.single('image'),updateUser);
userRoute.route('/changeRole').patch(protectRoute,validatorMiddleware,changeUserRole);
userRoute.route('/delete').delete(protectRoute,validatorMiddleware,deleteUser);

export default userRoute;