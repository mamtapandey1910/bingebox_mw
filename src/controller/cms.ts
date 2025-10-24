import {Request, Response, NextFunction } from "express";
import multer from 'multer'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {v4 as uuid} from 'uuid'
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

const storage = multer.memoryStorage()
export const upload = multer({storage})

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
})

export const uploadImages = async (req: Request, res: Response, next: NextFunction) =>{
    const { title} = req.body

    if(!req.file){
        return res.status(400).json({message: 'missing File'})
    }

        const originalFileName = req.file?.originalname

    const fileKey =   `${title}/${uuid()}-${originalFileName}`
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileKey,
        Body: req.file?.buffer,
        ContentType: req.file?.mimetype
    }

    //    await s3.send(new PutObjectCommand(params))

    const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`

    res.status(200).json({message : 'File has been uploaded', fileUrl})

}  