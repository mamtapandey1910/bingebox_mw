import express from "express";
import { loginUser, registerUser, updateUser } from "../controller/user";
import { isAuthenticated } from "../middleware/authenticate";
import { getMovie } from "../controller/movies";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.put("/:id/updateUser", updateUser);
userRouter.post("/login", loginUser);
// userRouter.get('/movies', isAuthenticated, getMovie)
