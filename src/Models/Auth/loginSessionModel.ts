import mongoose, { mongo } from 'mongoose'; 
import crypto from 'crypto'; 
import { v4 as uuidv4 } from 'uuid'
uuidv4()

interface ILoginSession extends Document{
    authToken: string; 
    refreshToken: string, 
    createdAt?: Date, 
    expiresAt: Date; 
    user: mongoose.Schema.Types.ObjectId; 

}

const loginSessionSchema: mongoose.Schema<ILoginSession> = new mongoose.Schema<ILoginSession>({
    authToken: {
        type: String, 
        required: true, 
    }, 
    refreshToken : {
        type: String, 
        required: true, 
    }, 
    createdAt: {
        type: Date, 
        required: false, 
    }, 
    expiresAt : {
        type: Date, 
        required : true, 
    },
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required : true
    }
}); 

export {loginSessionSchema}