import mongoose from "mongoose";
const { Schema } = mongoose;


const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    likes: {
      type: Number,
      default: 0
    },
    comments: [ 
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    createdAt : {
      type: Date,
      default: Date.now
    },
  },
);


const Posts = mongoose.model('post', postSchema);

export default Posts