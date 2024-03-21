import { Request, Response, NextFunction } from 'express';
import {userSignupValidator} from '../Validator/SignUpValidator'; // Import the validation middleware
import { ObjectId } from "mongodb";
import {collections} from "../Services/database.service";
import * as mongoDB from 'mongodb'; 
import * as dotenv from 'dotenv'; 
import { User } from '../Models/Auth/userModel';
import { MongoError } from 'mongodb';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = req.body as typeof User; 
        const result = await collections.users?.insertOne(newUser); 

        result
        ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
        : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
            // Duplicate key error, email already exists
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error('Error registering user:', error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


export { registerUser };
