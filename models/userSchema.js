import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
  },
  professsion: {
    type: String,
    default: "user",
    enum: ["user", "provider", "owner"],
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  city: {
    type: String,
    required: true,
    default: "halol",
  },
});

const User = mongoose.model("users", userSchema);

export default User;