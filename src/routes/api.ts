import express from "express";
import dummyController from "../controllers/dummy.controller";
import authController from "../controllers/auth.controller";

const router = express.Router();
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

export default router;
