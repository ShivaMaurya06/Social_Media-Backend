import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.session.user._id }).populate({
    path: 'comments',
    populate : {
        path: 'content'
    }
  })
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(400);
    throw new Error("Posts not found ....");
  }
});

const addPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("Title or Description missing .....");
  }
  const user = await User.findById(req.session.user._id);
  const post = await Post.create({
    title,
    description,
    user,
  });
  await user.updateOne({ $push: { posts: post._id } })
  if (post) {
    res.status(201).json({
      id: post._id,
      Title: post.title,
      Description: post.description,
      CreatedTime: post.createdAt,
    });
  } else {
    res.status(400);
    throw new Error("Request cannot be cleared");
  }
});

const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate({
    path: 'comments',
    populate : {
        path: 'content'
    }
  })
  if (!post) {
    res.status(404);
    throw new Error("Requested post does not exist....");
  }
  res.status(200).json({
    id: post._id,
    Likes: post.likes,
    Comments: post.comments,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(req.session.user._id);
  const post = await Post.findById(id);
  if (post) {
    await Post.deleteOne({ _id: post._id });
    await User.updateOne({ _id: user._id }, { $pull: { posts: post._id } });
    await Comment.deleteMany({ post: post._id})
    res.status(200).json({
      message: `Post with id: ${post._id} Deleted`,
    });
  }
  res.status(404);
  throw new Error("Post not found....");
});

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await Post.updateOne({ _id: post._id }, { $inc: { likes: 1 } });
    res.status(200).redirect(`/api/posts/${post._id}`);
  } else {
    res.status(404);
    throw new Error("Post not found......");
  }
});

const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await Post.updateOne({ _id: post._id }, { $inc: { likes: -1 } });
    res.status(200).redirect(`/api/posts/${post._id}`);
  } else {
    res.status(404);
    throw new Error("Post not found......");
  }
});

const addComment = asyncHandler(async (req, res) => { 
  const { content } = req.body;
  const post = await Post.findById(req.params.id)
  if(!content) {
    res.status(400)
    throw new Error("content is required......")
  }
  if (post) {
  const comment = await Comment.create({
    content: content,
    post: post._id
  });
      await post.updateOne({ $push: { comments: comment._id } }).populate('comments');
      res.status(201).json(comment)
    } else {
        res.status(404)
        throw new Error("Post not found ......");
    } 
});

export { addPost, getAllPosts, getPost, deletePost, likePost, unlikePost, addComment };
