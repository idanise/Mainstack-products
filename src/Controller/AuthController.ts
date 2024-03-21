import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../Services/AuthService';
import {userSignupValidator} from '../Validator/SignUpValidator';

const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await registerUser(req, res, next); 
    } catch (error) {
        console.error('Error in registerUserController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { registerUserController };