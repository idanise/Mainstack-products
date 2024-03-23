import { Request, Response, NextFunction } from 'express';

import { body, validationResult } from 'express-validator';

const createProductValidator = [
    body('name')
        .notEmpty().withMessage('Name')
        .isLength({ max: 32 }).withMessage('name must not exceed 32 characters'),
    body('category')
        .notEmpty().withMessage('category is required')
        .isLength({ max: 32 }).withMessage('Category must not exceed 32 characters'),
    body('description')
        .notEmpty().withMessage("Description is required")
        .isLength({max: 500}).withMessage("Cannot exceed 500 characters"),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be digits'),
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isNumeric().withMessage('Quantity must be digits'),
    body('photo')
        .isBase64().withMessage('Invalid base 64 character'),
    body('createdBy')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage("Createdby is required"),
    body().custom((value, { req }) => {
        const allowedFields: string[] = ['name', 'category', 'description', 'price', 'quantity', 'photo', 'createdBy'];
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

export { createProductValidator };
