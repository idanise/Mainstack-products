import { Request, Response, NextFunction } from 'express';

import { body, validationResult } from 'express-validator';

const userSignupValidator = [
    body('firstName')
        .notEmpty().withMessage('First Name is required')
        .isLength({ max: 32 }).withMessage('First Name must not exceed 32 characters'),
    body('lastName')
        .notEmpty().withMessage('Last Name is required')
        .isLength({ max: 32 }).withMessage('Last Name must not exceed 32 characters'),
    body('phoneNumber')
        .notEmpty().withMessage("Phone Number is required"),
    body('email')
        .isEmail().withMessage('Invalid email')
        .isLength({ min: 4, max: 32 }).withMessage('Email must be between 4 to 32 characters'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    body().custom((value, { req }) => {
        const allowedFields: string[] = ['firstName', 'lastName', 'phoneNumber', 'email', 'password', 'confirmPassword', 'middleName'];
        const additionalFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
        if (additionalFields.length > 0) {
            throw new Error(`Invalid fields not allowed: ${additionalFields.join(', ')}`);
        }
        return true;
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export { userSignupValidator };
