import express from 'express'
const router = express.Router()
import { createProductController, getProductByIdController, getProductsByCategoryController, deleteSingleProductController, updateProductController } from '../Controller/ProductController';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'
import { getAllProductsByCategory, getProductById } from '../Services/ProductService';

router.post('/create', isAdmin, createProductController);
router.get('/get', authenticate, getProductByIdController)
router.get('/get', authenticate, getProductsByCategoryController);
router.delete('/delete', isAdmin, deleteSingleProductController)
router.put('/update', isAdmin, updateProductController)

export default router
