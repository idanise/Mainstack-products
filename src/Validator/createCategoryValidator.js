"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryValidator = void 0;
var express_validator_1 = require("express-validator");
var createCategoryValidator = [
    (0, express_validator_1.body)('name')
        .notEmpty().withMessage('Name')
        .isLength({ max: 32 }).withMessage('name must not exceed 32 characters'),
    (0, express_validator_1.body)('createdBy')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage("Createdby is required"),
    (0, express_validator_1.body)().custom(function (value, _a) {
        var req = _a.req;
        var allowedFields = ['name', 'createdBy'];
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
exports.createCategoryValidator = createCategoryValidator;
