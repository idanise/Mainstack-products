"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignupValidator = void 0;
var express_validator_1 = require("express-validator");
var userSignupValidator = [
    (0, express_validator_1.body)('firstName')
        .notEmpty().withMessage('First Name is required')
        .isLength({ max: 32 }).withMessage('First Name must not exceed 32 characters'),
    (0, express_validator_1.body)('lastName')
        .notEmpty().withMessage('Last Name is required')
        .isLength({ max: 32 }).withMessage('Last Name must not exceed 32 characters'),
    (0, express_validator_1.body)('phoneNumber')
        .notEmpty().withMessage("Phone Number is required"),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email')
        .isLength({ min: 4, max: 32 }).withMessage('Email must be between 4 to 32 characters'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter'),
    (0, express_validator_1.body)('confirmPassword')
        .custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    (0, express_validator_1.body)().custom(function (value, _a) {
        var req = _a.req;
        var allowedFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'password', 'confirmPassword', 'middleName'];
        var additionalFields = Object.keys(req.body).filter(function (field) { return !allowedFields.includes(field); });
        if (additionalFields.length > 0) {
            throw new Error("Invalid fields not allowed: ".concat(additionalFields.join(', ')));
        }
        return true;
    }),
    function (req, res, next) {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
exports.userSignupValidator = userSignupValidator;
