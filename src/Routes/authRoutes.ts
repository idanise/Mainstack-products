import express from 'express'
const router = express.Router()

import { registerUser } from '../Services/AuthService'

import {userSignupValidator} from '../Validator/SignUpValidator'

router.post('/signup', userSignupValidator, registerUser)

export default router
