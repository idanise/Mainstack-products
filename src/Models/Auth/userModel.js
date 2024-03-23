"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["User"] = 0] = "User";
    UserRole[UserRole["Admin"] = 1] = "Admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: Number, enum: [UserRole.User, UserRole.Admin], default: UserRole.User },
    dateCreated: { type: Date, required: true },
    dateUpdated: { type: Date },
    middleName: { type: String }
}, {
    timestamps: true
});
var User = mongoose_1.default.model('User', userSchema);
exports.User = User;
