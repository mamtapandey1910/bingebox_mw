import express from 'express'

const authApp = express()
import { Router } from './auth-router/userRouter'

authApp.use(express.json())

authApp.use('/auth',Router )


export default authApp