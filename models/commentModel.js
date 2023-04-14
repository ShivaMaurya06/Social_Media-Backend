import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt : {
      type: Date,
      default: Date.now
    },
    post: { 
      type: mongoose.Types.ObjectId,
      ref: "post" 
    }
  },
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment