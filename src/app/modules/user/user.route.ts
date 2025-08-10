import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../../middlewares/auth";

const router = express.Router();

router.post("/register", UserControllers.createUser);

router.get("/me", auth("student", "admin"), UserControllers.getMe);

export const UserRoutes = router;
