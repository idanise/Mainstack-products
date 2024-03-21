import mongoose, { mongo, ObjectId } from 'mongoose'; 
import crypto from 'crypto'; 
import { v4 as uuidv4 } from 'uuid'
uuidv4()

// interface IUser extends Document{
//     firstName: string; 
//     lastName: string, 
//     middleName?: string, 
//     phoneNumber: string; 
//     email: string; 
//     password: string; 
//     salt?: string; 
//     role: number; 
//     dateCreated: Date, 
//     dateUpdated: Date, 
// }

// enum UserRole {
//     User = 0, 
//     Admin = 1
// }

// const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>({
//     firstName: {
//         type: String, 
//         trim: true, 
//         required: true, 
//         maxlength: 32
//     }, 
//     lastName : {
//         type: String, 
//         trim: true, 
//         required: true, 
//         maxlength: 32
//     }, 
//     middleName: {
//         type: String, 
//         trim: true, 
//         required: false, 
//         maxlength: 32
//     }, 
//     phoneNumber : {
//         type: String, 
//         trim : true, 
//         required : true, 
//         maxlength: 14
//     },
//     email : {
//         type: String, 
//         trim: true, 
//         required: true, 
//         unique: 32
//     }, 
//     password : {
//         type: String,
//         required: true
//     }, 
//     salt: String, 
//     role: {
//         type: Number, 
//         default: UserRole.User, 
//         enum : [UserRole.User, UserRole.Admin], 
//         required : true
//     }, 
//     dateCreated : {
//         type: Date, 
//         required : true, 
//     }, 
//     dateUpdated : {
//         type: Date, 
//         required : false
//     }
// }); 

// const User = mongoose.model<IUser>('User', userSchema);

// export {  User, IUser }; 


export default class User {
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}