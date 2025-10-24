import express from 'express';
import { loginUser, registerUser } from '../controller/authentication'
import { isAuthenticated } from '../middleware/authenticate';
import { getMovie } from '../controller/movies';

export const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/movies', isAuthenticated, getMovie)
