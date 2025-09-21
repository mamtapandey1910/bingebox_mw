import JWT from "jsonwebtoken"
import { jwtsecret, User } from "../models/userModel"


import { Request, Response, NextFunction } from "express"

export const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
    const { token } = req.cookies

    console.log('tokeennnn', token)

    const tokenMetadata: any = JWT.verify(token, jwtsecret)
    console.log('tokennnmetadata', tokenMetadata)

    try {
        req.user = await User.findById(tokenMetadata.id)
        res.status(200).json({ mesage: 'test' })

    } catch (err) {
        console.log(err)
        next(err)

    }

}