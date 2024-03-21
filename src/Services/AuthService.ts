import { Request, Response, NextFunction } from 'express';
import {userSignupValidator} from '../Validator/SignUpValidator'; // Import the validation middleware
import { IUser, userSchema } from "../Models/Auth/userModel";
import mongoose from 'mongoose';

// Define registerUser function
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: Partial<IUser> = req.body; 

        userData.dateCreated = new Date(); 

        const userModel = mongoose.model<IUser>('User', userSchema)
        
        const user = new userModel(userData);

        await user.save();

        return res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

export { registerUser };
