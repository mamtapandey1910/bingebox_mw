import express from 'express';
import { loginUser, registerUser } from '../controller/registration'

export const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
