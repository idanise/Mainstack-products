import { Request, Response, NextFunction, response } from 'express';
import {userSignupValidator} from '../Validator/SignUpValidator'; 
import { ObjectId } from "mongodb";
import {collections} from "../Services/database.service";
import * as mongoDB from 'mongodb'; 
import * as dotenv from 'dotenv'; 
import { MongoError } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { IUser, User, UserRole } from '../Models/Auth/userModel';
import * as jwt from 'jsonwebtoken'; 
import { ResponseInfo } from '../Helpers/Response';



//Method to register a user
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

       const newUser = req.body as IUser; 

       const email = newUser.email as string; 
    

       //Check whether email exists or not
       const user = await collections.users?.findOne({email}); 
       console.log(user); 

       if (user) {
           const jsonResponse = {
               responseCode: ResponseInfo.UserExists.code,
               responseMessage: ResponseInfo.UserExists.description,
               data: null
           };
           return res.status(400).json(jsonResponse);
       }

        //Hash password
        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds); 
        const hashedPassword = await bcrypt.hash(newUser.password, salt); 


        //Save user to db
        newUser.password = hashedPassword; 
        newUser.salt = salt; 
        newUser.dateCreated = new Date(); 
        newUser.role = UserRole.User; 
        const result = await collections.users?.insertOne(newUser); 


        const response = result
        ? {
            responseCode: ResponseInfo.Success.code,
            responseMessage: ResponseInfo.Success.description,
            data: result
        }
        : {
            responseCode: ResponseInfo.Failed.code,
            responseMessage: ResponseInfo.Failed.description,
            data: null
        };
    
    res.status(response ? 200 : 400).json(response);

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
};


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        //Query db with email 
        const { email, password } = req.body; 
        const secret_key = process.env.SECRET_KEY as string; 
        const user = await collections.users?.findOne({email}); 

        if (!user) {
            const jsonResponse = {
                responseCode: ResponseInfo.InvalidUser.code,
                responseMessage: ResponseInfo.InvalidUser.description,
                data: null
            };
            return res.status(401).json(jsonResponse);
        }
        
        
        //Check for password match
        const passwordMatch = await bcrypt.compare(password, user.password); 
        if (!passwordMatch) {
            const jsonResponse = {
                responseCode: ResponseInfo.InvalidCredentials.code,
                responseMessage: ResponseInfo.InvalidCredentials.description,
                data: null
            };
            return res.status(401).json(jsonResponse);
        }

        //Return token if password is a match
        const token = jwt.sign({ userId: user._id, role: user.role }, secret_key, { expiresIn: '30m' });
        const response = token
        ? {
            responseCode: ResponseInfo.Success.code,
            responseMessage: ResponseInfo.Success.description,
            data: token
        }
        : {
            responseCode: ResponseInfo.Failed.code,
            responseMessage: ResponseInfo.Failed.description,
            data: null
        };
    
    res.status(token ? 200 : 400).json(response);
    

    } catch(error){
        console.error('Error login in:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
}



export { registerUser, loginUser };
