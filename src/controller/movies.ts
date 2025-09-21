import { Request, Response, NextFunction } from "express"

export const getMovie = (req: Request, res: Response, next: NextFunction) => {

    const movieMetadata = {
        id: 'd1r65ldew3sh0e',
        title: 'titanic',
        description: 'Old Titanic movie',
        hlsUri: 'https://d1r65ldew3sh0e.cloudfront.net/index.m3u8'
    }

    return res.status(200).json({ movieMetadata: [movieMetadata], message: 'Movies has been successfully fetched' })
}