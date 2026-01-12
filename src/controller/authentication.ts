import { NextFunction, Request, Response } from 'express'
import { createUser } from '../models/user.model'
import bcryptjs from 'bcryptjs'

export const registerUser = async (req: Request, res: Response) => {
    try{
        const userdetails = await createUser(req.body.name, req.body.email, req.body.password,  req.body.role)
        console.log('userdetails', userdetails)
        res.status(201).send({message: 'User has been created successfully', user: userdetails })

    }catch(err){
        if(err instanceof Error){
        console.log(err)
        res.status(500).send({ message: 'Error has been occured', error: err.message })

        }
    }
   

}


