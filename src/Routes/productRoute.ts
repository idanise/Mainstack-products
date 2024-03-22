import express from 'express'
const router = express.Router()
import { createProduct, getProductById, getAllProductsByCategory, deleteSingleProduct, updateProduct } from '../Services/ProductService';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'

router.post('/create', isAdmin, createProduct);
router.get('/get', authenticate, getProductById)
router.get('/get', authenticate, getAllProductsByCategory);
router.delete('/delete', isAdmin, deleteSingleProduct)
router.put('/update', isAdmin, updateProduct)

export default router
