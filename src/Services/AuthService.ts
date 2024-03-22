import { Request, Response, NextFunction, response } from 'express';
import {userSignupValidator} from '../Validator/SignUpValidator'; 
import { ObjectId } from "mongodb";
import {collections} from "../Services/database.service";
import * as mongoDB from 'mongodb'; 
import * as dotenv from 'dotenv'; 
import { MongoError } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { IUser, User } from '../Models/Auth/userModel';
import * as jwt from 'jsonwebtoken'; 


const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

       const newUser = req.body as IUser; 

        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds); 

        const hashedPassword = await bcrypt.hash(newUser.password, salt); 

        newUser.password = hashedPassword; 
        newUser.salt = salt; 
        newUser.dateCreated = new Date(); 

        const result = await collections.users?.insertOne(newUser); 


        const response = result
        ? {
            responseCode: "00",
            responseMessage: `Successful created user with id ${result.insertedId}`,
            data: result
        }
        : {
            responseCode: "99",
            responseMessage: "Failed to create user",
            data: null
        };
    
    res.status(response ? 200 : 400).json(response);

    } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error('Error registering user:', error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password } = req.body; 

        const secret_key = process.env.SECRET_KEY as string; 

        const user = await collections.users?.findOne({email}); 

        if (!user) {
            const jsonResponse = {
                responseCode: "01",
                responseMessage: "Invalid email or password",
                data: null
            };
            return res.status(401).json(jsonResponse);
        }
        

        const passwordMatch = await bcrypt.compare(password, user.password); 

        if (!passwordMatch) {
            const jsonResponse = {
                responseCode: "01",
                responseMessage: "Invalid email or password",
                data: null
            };
            return res.status(401).json(jsonResponse);
        }

        const token = jwt.sign({ userId: user._id, role: user.userRole }, secret_key, { expiresIn: '30m' });

        const response = token
        ? {
            responseCode: "00",
            responseMessage: "Successful login",
            data: token
        }
        : {
            responseCode: "99",
            responseMessage: "Login failed",
            data: null
        };
    
    res.status(token ? 200 : 400).json(response);
    

    } catch(error){
        console.error('Error login in:', error);
        return res.status(500).json({ error: "Login Failed" });
    }
}


export { registerUser, loginUser };
