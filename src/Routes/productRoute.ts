import express from 'express'
const router = express.Router()
import { createProductController, getProductByIdController, getProductsByCategoryController } from '../Controller/ProductController';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'
import { getAllProductsByCategory, getProductById } from '../Services/ProductService';

router.post('/create', isAdmin, createProductController);
router.get('/get', authenticate, getProductByIdController)
router.get('/get', getAllProductsByCategory);

export default router
