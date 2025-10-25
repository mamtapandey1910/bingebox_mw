import express from 'express'
import { loginUser, refreshToken } from '../auth-middleware/authenticate'

export const Router = express.Router()

Router.post('/login', loginUser)
Router.get('/refresh', refreshToken)