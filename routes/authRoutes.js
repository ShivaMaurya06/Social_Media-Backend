import express from 'express'
const router = express.Router();
import { registerUser, authenticateUser } from '../controllers/authController.js';

router.post("/register", registerUser);


// login User
router.post("/authenticate", authenticateUser);

export default router;