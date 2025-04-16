import express from "express";
import { login, logout, signup, updateUser, changePassword } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", isAuthenticated, updateUser);
router.put("/changePassword", isAuthenticated, changePassword);

export default router;
