import { Request, Response, NextFunction } from "express";
import { movieMetadata } from "../constants/movies";

export const getMovie = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    movieMetadata: movieMetadata,
    message: "Movies has been successfully fetched",
  });
};

export const getImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
