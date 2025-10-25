import { Request, Response } from 'express'
import { User } from '../../src/models/userModel'
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'

const refreshTokenSecret = 'refreshToken'
const jwtSectetToken = 'HelloIamsecret'

const createRefreshToken = (user: any) => {
    console.log('userid', user._id)
    const token = JWT.sign({id: user._id}, refreshTokenSecret)
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

    res.status(200).json({ message: "Logged in successfully", token, refreshToken });
}


export const refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.headers['authorization']?.split(" ")[1]

    if(!refreshToken){
        return res.status(401).json({message: 'Please login to refresh token'})
    }
    try{
        const verifyRefresh: {id: string, iat: any} = JWT.verify(refreshToken, refreshTokenSecret) as any

        const token = JWT.sign({id: verifyRefresh.id}, jwtSectetToken ,{ expiresIn: '30s'})
        res.status(200).json({message: 'new token  has been generated', token})

    }catch(err : any){
        if(err){
            return res.status(401).json({message: err.message })
        }
    }


}