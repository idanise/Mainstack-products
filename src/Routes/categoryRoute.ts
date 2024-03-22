import express from 'express'
const router = express.Router()
import { createCategoryController } from '../Controller/CategoryController';
import {authenticate, isAdmin} from '../Helpers/AuthHelper'

router.post('/create', isAdmin, createCategoryController);

export default router
