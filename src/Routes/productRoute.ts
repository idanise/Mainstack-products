import express from 'express'
const router = express.Router()
import { createProductController } from '../Controller/ProductController';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'

router.post('/create', isAdmin, createProductController);

export default router
