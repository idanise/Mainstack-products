import express from 'express'
const router = express.Router()
import { createProductController } from '../Controller/ProductController';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'
import { getProductById } from '../Services/ProductService';

router.post('/create', isAdmin, createProductController);
router.get('/get/:productId', authenticate, getProductById)

export default router
