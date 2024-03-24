"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const database_service_1 = require("../Services/database.service");
const bcrypt = __importStar(require("bcrypt"));
const userModel_1 = require("../Models/Auth/userModel");
const jwt = __importStar(require("jsonwebtoken"));
const Response_1 = require("../Helpers/Response");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const newUser = req.body;
        const email = newUser.email;
        const user = yield ((_a = database_service_1.collections.users) === null || _a === void 0 ? void 0 : _a.findOne({ email }));
        console.log(user);
        if (user) {
            const jsonResponse = {
                responseCode: Response_1.ResponseInfo.UserExists.code,
                responseMessage: Response_1.ResponseInfo.UserExists.description,
                data: null
            };
            return res.status(400).json(jsonResponse);
        }
        const saltRounds = 10;
        const salt = yield bcrypt.genSalt(saltRounds);
        const hashedPassword = yield bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        newUser.salt = salt;
        newUser.dateCreated = new Date();
        newUser.role = userModel_1.UserRole.User;
        const result = yield ((_b = database_service_1.collections.users) === null || _b === void 0 ? void 0 : _b.insertOne(newUser));
        const response = result
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: result
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(response ? 200 : 400).json(response);
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { email, password } = req.body;
        const secret_key = process.env.SECRET_KEY;
        const user = yield ((_c = database_service_1.collections.users) === null || _c === void 0 ? void 0 : _c.findOne({ email }));
        if (!user) {
            const jsonResponse = {
                responseCode: Response_1.ResponseInfo.InvalidUser.code,
                responseMessage: Response_1.ResponseInfo.InvalidUser.description,
                data: null
            };
            return res.status(401).json(jsonResponse);
        }
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const jsonResponse = {
                responseCode: Response_1.ResponseInfo.InvalidCredentials.code,
                responseMessage: Response_1.ResponseInfo.InvalidCredentials.description,
                data: null
            };
            return res.status(401).json(jsonResponse);
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, secret_key, { expiresIn: '30m' });
        const response = token
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: token
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(token ? 200 : 400).json(response);
    }
    catch (error) {
        console.error('Error login in:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.loginUser = loginUser;
