import { NextFunction, Request, Response } from "express";
import { createUser, updatedUserModel } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { catchAsyncError } from "../utils/catchAsyncError";

export const registerUser = catchAsyncError(
  async (req: Request, res: Response) => {
    const userdetails = await createUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.role
    );
    console.log("userdetails", userdetails);
    res.status(201).send({
      message: "User has been created successfully",
      user: userdetails,
    });
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

    const updateUse = await updatedUserModel(id, name, email, password, role);
    res.status(200).send({ message: "User has been created successfully" });
  }
);
