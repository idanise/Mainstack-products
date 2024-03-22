import mongoose, { mongo, Schema, ObjectId } from 'mongoose'; 

enum UserRole {
    User = 0, 
    Admin = 1
}

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

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser, UserRole };
