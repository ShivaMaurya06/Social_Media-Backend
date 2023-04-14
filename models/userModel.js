import mongoose from "mongoose";
const {Schema } = mongoose;

const userSchema = new Schema(
  { 
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "posts"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('user',userSchema);

export default User
