import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  ux: {
    type: String,
  },
  message: {
    type: String,
  },
  time: {
    type: String,
    default: new Date(),
  },
});

const Issue = mongoose.model("issues", issueSchema);

export default Issue;