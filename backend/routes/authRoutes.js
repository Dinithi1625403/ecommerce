import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile); // 🟢 Protected route

export default router;
