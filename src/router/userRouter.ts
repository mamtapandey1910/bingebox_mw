import express from 'express';
import { registerUser } from '../controller/authentication'
import { isAuthenticated } from '../middleware/authenticate';
import { getMovie } from '../controller/movies';

export const userRouter = express.Router()

userRouter.post('/register', registerUser)
// userRouter.get('/movies', isAuthenticated, getMovie)

