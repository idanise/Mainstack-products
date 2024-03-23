"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var SignUpValidator_1 = require("../Validator/SignUpValidator");
var AuthService_1 = require("../Services/AuthService");
router.post('/signup', SignUpValidator_1.userSignupValidator, AuthService_1.registerUser);
router.post('/login', AuthService_1.loginUser);
exports.default = router;
