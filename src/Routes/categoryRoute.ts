import express from 'express'
const router = express.Router()
import { createCategoryController } from '../Controller/CategoryController';
import {authenticate} from '../Helpers/AuthHelper'

router.post('/create', authenticate,  createCategoryController);

export default router
