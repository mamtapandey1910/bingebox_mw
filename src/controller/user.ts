import { NextFunction, Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  updatedUserModel,
  verifyUser,
} from "../models/user.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import JWT from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { getJWTToken } from "../middleware/authenticate";

export const registerUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const userdetails = await createUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.role
    );
    res.status(201).send({
      message: "User has been created successfully",
      user: userdetails,
    });
  }
);

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: "Please enter id and password" });
      return;
    }

    const user = await findUserByEmail(email);
    const isUserValid = await bcryptjs.compare(password, user.password);
    console.log("isUserValid", isUserValid);
    const token = getJWTToken(user.id);
    res
      .status(200)
      .send({ message: "You have been loggedin successfully", token });
  }
);

export const updateUser = catchAsyncError(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ message: "Please send id" });
      return;
    }
    await updatedUserModel(id, name, email, password, role);
    res.status(200).send({ message: "User has been updated successfully" });
  }
);
