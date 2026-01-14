import express from 'express';
import { userRouter } from './router/userRouter';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { globalErrorHandle } from './middleware/globalErrorHandle';
import { assetRouter } from './router/assetRouter';

const app = express()

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.get('/', (req, res) => {
    console.log('this is homepage')
    res.status(200).json({message : "Hello Kubernetes"})
})

app.use('/asset', assetRouter )

app.use('/user', userRouter)
app.use(globalErrorHandle)

export default app