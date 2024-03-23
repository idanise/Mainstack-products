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
    role: UserRole;
    middleName?: string;
    dateCreated: Date; 
    dateUpdated?: Date; 

}

const userSchema: Schema<IUser> = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: Number, enum: [UserRole.User, UserRole.Admin], default: UserRole.User },
    dateCreated: {type: Date, required: true}, 
    dateUpdated: {type: Date},
    middleName: { type: String }
}, {
    timestamps: true 
});

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser, UserRole };
