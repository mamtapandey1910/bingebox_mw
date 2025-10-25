import { NextFunction, Request, Response } from 'express'
import { User } from '../models/userModel'
import bcryptjs from 'bcryptjs'

export const registerUser = async (req: Request, res: Response) => {
    console.log('userbody', req.body)
    const body = await User.create(req.body)

    res.send({ status: 201, message: 'User has been created successfully' })
}


