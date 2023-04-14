import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"

const getUser = asyncHandler(async(req,res) => {
    if(req.session.authorized) {
        const id = req.session.user._id;
        const user = await User.findById(id);
        res.json({
            username: user.username,
            followers: user.followers.length,
            following: user.following.length
        })
    }
    else {
        res.status(400)
        throw new Error("LogIn required...")
    }
});

const followUser = asyncHandler(async(req, res) => {
    if (req.session.user._id !== req.params.id) {
        try {
          const user = await User.findById(req.params.id)
          const currentUser = await User.findById(req.session.user._id)
          if (!currentUser.followers.includes(req.params.id)) {
            await User.updateOne({_id: user._id}, { $push: { following: currentUser._id } });
            await User.updateOne({_id: currentUser._id },{ $push: { followers: req.params.id } });
            console.log(user.following)
            res.status(200).redirect("/api/user")
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err); 
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
})

const unfollowUser = asyncHandler(async(req,res) => {
    if (req.session.user._id !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.session.user._id);
          if (currentUser.followers.includes(req.params.id)) {
            await User.updateOne({_id: user._id}, { $pull: { following: currentUser._id } });
            await User.updateOne({_id: currentUser._id}, { $pull: { followers: req.params.id } });
            res.status(200).redirect("/api/user")
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
})

export {
    getUser,
    followUser,
    unfollowUser
}