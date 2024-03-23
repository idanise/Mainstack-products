import { Request, Response, NextFunction } from 'express';

import { body, validationResult } from 'express-validator';

const createCategoryValidator = [
    body('name')
        .notEmpty().withMessage('Name')
        .isLength({ max: 32 }).withMessage('name must not exceed 32 characters'),
    body('createdBy')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage("Createdby is required"),
    body().custom((value, { req }) => {
        const allowedFields: string[] = ['name', 'createdBy'];
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

export { createCategoryValidator };
