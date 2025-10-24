import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' })

import app from "./app";
import { connectToMongoDB } from './db'

connectToMongoDB()

app.listen(8000, () => {
    console.log('server is running on port 8000')
})
