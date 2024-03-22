import express from 'express'
const router = express.Router()
import {authenticate, isAdmin} from '../Helpers/AuthHelper'
import { createCategory } from '../Services/CategoryService';

router.post('/create', isAdmin, createCategory);

export default router
