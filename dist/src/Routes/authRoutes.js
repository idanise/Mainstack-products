"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const SignUpValidator_1 = require("../Validator/SignUpValidator");
const AuthService_1 = require("../Services/AuthService");
router.post('/signup', SignUpValidator_1.userSignupValidator, AuthService_1.registerUser);
router.post('/login', AuthService_1.loginUser);
exports.default = router;
