import JWT from "jsonwebtoken";
import { User } from "../models/userModel";

import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../utils/catchAsyncError";

export const getJWTToken = (id: string): string => {
  return JWT.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "2m",
  });
};

export const isAuthenticated = catchAsyncError(
  async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const authResponse = req.headers.authorization;

    const token = authResponse?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "you are not loggedIn" });
    }
    try {
      const tokenMetadata: any = JWT.verify(
        token,
        process.env.JWT_SECRET as string
      );
      req.user = await User.findById(tokenMetadata.id);
      return next();
    } catch (err) {
      return next(err);
    }
  }
);
