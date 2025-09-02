import { Request, Response } from 'express'
import { User } from '../models/userModel'
import bcryptjs from 'bcryptjs'

export const registerUser = async (req: Request, res: Response) => {
    console.log('userbody', req.body)
    const body = await User.create(req.body)

    res.send({ status: 201, message: 'User has been created successfully' })
}


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
    res.send({ status: 200, message: 'You have logged in successfully', token })
}
