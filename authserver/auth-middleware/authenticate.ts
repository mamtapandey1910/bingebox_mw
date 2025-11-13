import { Request, Response } from 'express'
import { User } from '../../src/models/userModel'
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'
import {createClient} from 'redis'

const redisClient = createClient({url: 'redis://localhost:6379'})
redisClient.connect()

const createRefreshToken = (user: any) => {
    console.log('userid', user._id)
    const token = JWT.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET as string)
    return token
}

// login user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.send({ status: '401', message: "please enter email and password" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.send({ status: 404, message: 'User not found' })
    }
    const isValidUser = await bcryptjs.compare(password, user.password)

    if (!isValidUser) {
        return res.status(401).send({ message: 'Please enter correct id and password' })
    }

    const token = user?.getJWTtoken()
    const refreshToken = createRefreshToken(user)

    await redisClient.set(`refresh-token:${user._id}`, refreshToken, {EX: 60})

    res.status(200).json({ message: "Logged in successfully", token, refreshToken });
}


export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.headers['authorization']?.split(" ")[1]


    if(!refreshToken){
        return res.status(401).json({message: 'Please login to refresh token'})
    }
    try{
        const verifyRefresh: {id: string, iat: any} = JWT.verify(refreshToken,  process.env.REFRESH_TOKEN_SECRET as string) as any
        const isRefreshTokenInRedis = await redisClient.get(`refresh-token:${verifyRefresh.id}`)

        if(!isRefreshTokenInRedis){
            return res.status(401).json({message: 'You have been logged out, please login'})
        }

        const token = JWT.sign({id: verifyRefresh.id}, process.env.JWT_SECRET as string,{ expiresIn: '1d'})
        res.status(200).json({message: 'new token  has been generated', token})

    }catch(err : any){
        if(err){
            return res.status(401).json({message: err.message })
        }
    }
}