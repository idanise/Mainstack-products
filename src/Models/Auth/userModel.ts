import mongoose, { mongo, Schema, ObjectId } from 'mongoose'; 
// import crypto from 'crypto'; 
// import { v4 as uuidv4 } from 'uuid'
// import { Db } from 'mongodb';
// uuidv4()


enum UserRole {
    User = 0, 
    Admin = 1
}


// interface IUser extends Document {
//     firstName: string;
//     lastName: string;
//     phoneNumber: number;
//     email: string;
//     password: string;
//     salt: string;
//     userRole: UserRole;
//     middleName?: string;

//     authenticate(plainText: string): boolean;
//     encryptPassword(password: string): string;

// }

// const userSchema: Schema<IUser> = new Schema<IUser>({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     phoneNumber: { type: Number, required: true },
//     email: { type: String, required: true, unique: true }, 
//     password: { type: String, required: true },
//     salt: { type: String, required: true },
//     userRole: { type: Number, enum: [UserRole.User, UserRole.Admin], default: UserRole.User },
//     middleName: { type: String }
// });

// userSchema.index({ email: 1 }, { unique: true });


// userSchema
//     .virtual('password')
//     .set(function (this: IUser, password: string) {
//         this.salt = uuidv4();
//         this.password = this.encryptPassword(password);
//     });

// userSchema.methods.authenticate = function (this: IUser, plainText: string): boolean {
//     return this.encryptPassword(plainText) === this.password;
// };

// userSchema.methods.encryptPassword = function (this: IUser, password: string): string {
//     if (!password) return '';
//     try {
//         return crypto
//             .createHmac('sha1', this.salt)
//             .update(password)
//             .digest('hex');
//     } catch (error) {
//         return '';
//     }
// };


// const User = mongoose.model<IUser>('User', userSchema);

// export { User, IUser, UserRole };



import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
// import { Schema, Document } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    password: string;
    salt: string;
    userRole: UserRole;
    middleName?: string;

    authenticate(plainText: string): boolean;
    encryptPassword(password: string): string;
    _password: string; 

}

const userSchema: Schema<IUser> = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    userRole: { type: Number, enum: [UserRole.User, UserRole.Admin], default: UserRole.User },
    middleName: { type: String }
});

// userSchema.virtual('password')
//     .set(function (this: IUser, password: string) {
//         this._password = password;
//         this.salt = uuidv4();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function (this: IUser) {
//         return this._password;
//     });

// userSchema.methods.authenticate = function (this: IUser, plainText: string): boolean {
//     return this.encryptPassword(plainText) === this.hashed_password;
// };

// userSchema.methods.encryptPassword = function (this: IUser, password: string): string {
//     if (!password || !this.salt) return '';
//     return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
// };

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser, UserRole };
