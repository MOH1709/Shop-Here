import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
  },
  type: {
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
  areaId: {
    type: String,
    required: true,
    default: "halol",
  },
  tokens: {
    type: Array,
  },
});

//----------------------------------------> Hashing password before saving
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//-----------------------------------------------> generating jsonwebtoken
userSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat(token);
    await this.save();
    return token;
  } catch (e) {
    return e;
  }
};

const User = mongoose.model("users", userSchema);

export default User;