import { NextFunction, Response, Request } from "express"

export const globalErrorHandle = (error: any, req: any, res: Response, next: NextFunction): any => {
    console.log(error)

    let message = error.message || "Something went wrong"
    let statusCode = error.status || 500

    if (error.name === 'JsonWebTokenError') {
        message = "Token has not been varified"
        statusCode = 401
    }

    return res.status(statusCode).json({ message })
}