import { NextFunction, Request, Response } from 'express'
import { createUser, updatedUserModel } from '../models/user.model'
import bcryptjs from 'bcryptjs'
import { catchAsyncError } from '../utils/catchAsyncError'

export const registerUser =  catchAsyncError(async (req: Request, res: Response) => {
    // try{
        const userdetails = await createUser(req.body.name, req.body.email, req.body.password,  req.body.role)
        console.log('userdetails', userdetails)
        res.status(201).send({message: 'User has been created successfully', user: userdetails })

    // }catch(err){
    //     if(err instanceof Error){
    //     console.log(err)
    //     res.status(500).send({ message: 'Error has been occured', error: err.message })

    //     }
    // }

})

export const updateUser = async (req: Request, res: Response) =>{
    const requestBodyData = req.body

    const updateUse = await updatedUserModel( req.params.id,
    req.body.email, 
    req.body.password, 
     req.body.role)
    res.status(200).send({message: 'User has been created successfully' })

}

