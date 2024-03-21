import mongoose, { mongo, Schema, ObjectId } from 'mongoose'; 
import crypto from 'crypto'; 
import { v4 as uuidv4 } from 'uuid'
uuidv4()


enum UserRole {
    User = 0, 
    Admin = 1
}

// export default class User {
//     constructor(
//         public firstName: string, 
//         public lastName: string, 
//         public phoneNumber: number, 
//         public email : string, 
//         public password: string, 
//         public salt : string, 
//         public userRole : UserRole = UserRole.User,
//         public timeStamp = true,
//         public id?: ObjectId) {}
//         public middleName?: string
// }


interface IUser extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    password: string;
    salt: string;
    userRole: UserRole;
    middleName?: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, // Make email unique
    password: { type: String, required: true },
    salt: { type: String, required: true },
    userRole: { type: Number, enum: [UserRole.User, UserRole.Admin], default: UserRole.User },
    middleName: { type: String }
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser, UserRole };