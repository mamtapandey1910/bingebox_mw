import express from "express";
import { registerUser, updateUser } from "../controller/user";
import { isAuthenticated } from "../middleware/authenticate";
import { getMovie } from "../controller/movies";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.put("/:id/updateUser", updateUser);
// userRouter.get('/movies', isAuthenticated, getMovie)
