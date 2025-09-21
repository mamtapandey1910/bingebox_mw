import express from 'express';
import { userRouter } from './router/userRouter';
import { connectToMongoDB } from './db'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { globalErrorHandle } from './middleware/globalErrorHandle';

const app = express()
connectToMongoDB()
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    allowedHeaders: '*',
    origin: '*'
}))
app.use('/user', userRouter)
app.use(globalErrorHandle as any)

// app.get('/', (req: Request, res) => {
//     console.log('this is homepage')
//     res.send('this is homepage')
// })



app.listen(8000, () => {
    console.log('server is running on port 8000')
})