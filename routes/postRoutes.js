import express from 'express'
const router = express.Router();
import { addComment, addPost, deletePost, getAllPosts, getPost, likePost, unlikePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
// create a POST

// router.use(protect)
router.post("/posts", addPost)

// get POST with given id
// delete POST with given id

router.route("/posts/:id")
  .get(getPost)
  .delete(deletePost);

// get POSTS created by an authenticated user

router.get("/all_posts", getAllPosts);

// like a POST

router.post("/like/:id", likePost);

// dislike a POST

router.post("/unlike/:id", unlikePost);

// add a comment to the POST

router.post("/comment/:id", addComment)


export default router;