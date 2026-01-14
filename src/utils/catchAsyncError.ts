import { Request, Response, NextFunction } from "express"
import { catchAsyncFuncType } from "./catchAsyncErrorType"


export const catchAsyncError = (func: catchAsyncFuncType) =>{
    return async (req: Request, res: Response, next: NextFunction) =>{
        try{
           await func(req, res, next)
        }catch(err){
            next(err)
        }
    }
}