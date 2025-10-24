import {Request, Response, NextFunction } from "express";
import multer from 'multer'
import { S3Client } from "@aws-sdk/client-s3";
import {v4 as uuid} from 'uuid'

const storage = multer.memoryStorage()
export const upload = multer({storage})

export const uploadImages = (req: Request, res: Response, next: NextFunction) =>{
    const { title} = req.body

    if(!req.file){
        return res.status(400).json({message: 'missing File'})
    }

    const originalFileName = req.file?.originalname

    const fileKey =   `${title}/${uuid()}-${originalFileName}`
    console.log(fileKey)

    res.status(200).json({message : 'File has been uploaded'})
    
}  