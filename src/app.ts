import express from 'express';
import { userRouter } from './router/userRouter';
import { connectToMongoDB } from './db'

const app = express()
connectToMongoDB()
app.use(express.json());

app.use('/user', userRouter)

// app.get('/', (req: Request, res) => {
//     console.log('this is homepage')
//     res.send('this is homepage')
// })



app.listen(8000, () => {
    console.log('server is running on port 8000')
})