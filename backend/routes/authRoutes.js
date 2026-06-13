import express from "express";


import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/authController.js";

import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Optional: protect logout route
router.get("/logout", verifyUser, logoutUser);

export default router;