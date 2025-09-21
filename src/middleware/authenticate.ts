import JWT from "jsonwebtoken"
import { jwtsecret, User } from "../models/userModel"


import { Request, Response, NextFunction } from "express"

export const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
    const authResponse = req.headers.authorization


    const token = authResponse.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'you are not loggedIn' })
    }
    try {
        const tokenMetadata: any = JWT.verify(token, jwtsecret)
        req.user = await User.findById(tokenMetadata.id)
        return next()
    } catch (err) {
        return next(err)
    }
}