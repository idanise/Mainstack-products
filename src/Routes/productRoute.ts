const express = require('express')
const router = express.Router()
import { createProduct, getProductById, getAllProductsByCategory, deleteSingleProduct, updateProduct } from '../Services/ProductService';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'
import { createProductValidator } from '../Validator/CreateProductValidator';

router.post('/create', createProductValidator, isAdmin, createProduct);
router.get('/get', authenticate, getProductById)
router.get('/get/productsByCategory', authenticate, getAllProductsByCategory);
router.delete('/delete', isAdmin, deleteSingleProduct)
router.put('/update', isAdmin, updateProduct)

export default router
