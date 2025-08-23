import { Request, Response, NextFunction } from 'express';
import usersModel from '../Models/userModel';
import cloudinary from '../middlwares/cloudinary';
import customErrors from '../middlwares/Errors';
import { newRequest } from '../Interfaces/req';
import expressAsyncHandler from 'express-async-handler';


export const getUsers = expressAsyncHandler(async (req: newRequest, res: Response, next: NextFunction): Promise<void> => {
  
    const users = await usersModel.find();
    res.status(200).json({ success: true, data: users });
      if(!users){
     next(new customErrors("server error", 500))
      }
});


export const getUser =  expressAsyncHandler(async (req: newRequest, res: Response, next: NextFunction): Promise<void> => {
     const userId = req.user?._id;
    const user = await usersModel.findById(userId);
    if (!user) { res.status(404).json({ success: false, message: 'User not found' });
  return;
}
    res.status(200).json({ success: true, data: user });
    
});


export const updateUser = expressAsyncHandler(async (req: newRequest, res: Response, next: NextFunction): Promise<void> => {

    let updateData = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user_profiles'
      });
      updateData.image = result.secure_url;
    }
     const userId = req.user?._id;
    const user = await usersModel.findByIdAndUpdate(userId, updateData, { new: true });
    
    if (!user) { res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, data: user });
    
    
  
});


export const changeUserRole = expressAsyncHandler(async (req: newRequest, res: Response, next: NextFunction): Promise<void> => {
     const userId = req.user?._id;

    const user = await usersModel.findByIdAndUpdate(
      userId,
      { role: req.body.role },
      { new: true }
    );
    if (!user) { res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
    
});


export const deleteUser =expressAsyncHandler(async (req: newRequest, res: Response, next: NextFunction): Promise<void> => {
     const userId = req.user?._id;

    const user = await usersModel.findByIdAndDelete(userId);
    if (!user) { res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'User deleted successfully' });
    
});
