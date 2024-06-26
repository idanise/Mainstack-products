"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const AuthHelper_1 = require("../Helpers/AuthHelper");
const CategoryService_1 = require("../Services/CategoryService");
const createCategoryValidator_1 = require("../Validator/createCategoryValidator");
router.post('/create', createCategoryValidator_1.createCategoryValidator, AuthHelper_1.isAdmin, CategoryService_1.createCategory);
router.get('/get', AuthHelper_1.authenticate, CategoryService_1.getCategoryById);
router.get('/getall', AuthHelper_1.authenticate, CategoryService_1.getAllCategories);
router.delete('/delete', AuthHelper_1.isAdmin, CategoryService_1.deleteSingleCategory);
router.put('/update', AuthHelper_1.isAdmin, CategoryService_1.updateCategory);
exports.default = router;
