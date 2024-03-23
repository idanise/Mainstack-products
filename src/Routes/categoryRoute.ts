const express = require('express')
const router = express.Router()
import {authenticate, isAdmin} from '../Helpers/AuthHelper'
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteSingleCategory } from '../Services/CategoryService';
import { createCategoryValidator } from '../Validator/createCategoryValidator';

router.post('/create', createCategoryValidator, isAdmin, createCategory);
router.get('/get', authenticate, getCategoryById)
router.get('/getall', authenticate, getAllCategories);
router.delete('/delete', isAdmin, deleteSingleCategory)
router.put('/update', isAdmin, updateCategory)

export default router
