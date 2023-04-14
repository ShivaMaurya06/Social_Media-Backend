import express from 'express'
const router = express.Router();
import { getUser, followUser, unfollowUser } from '../controllers/userController.js';

// get USER details
router.get('/user', getUser);

// follow USER with given id
router.post("/follow/:id", followUser);

// unfollow USER with given id
router.post("/unfollow/:id", unfollowUser);


export default router
