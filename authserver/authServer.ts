import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' })

import authApp from "./authApp";
import { connectToMongoDB } from '../db'

connectToMongoDB('authServer')

authApp.listen(8001, () => {
    console.log('server is running on port 8001')
})
