import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
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
  currentLocation: {
    type: Array,
  },
  address: {
    type: String,
    default: "",
  },
  tokens: {
    type: Array,
  },
});

//----------------------------------------> Hashing password before saving
userSchema.pre("save", async function(next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (e) {
    console.log("error in hashing password");
  }
});

//-----------------------------------------------> generating jsonwebtoken
userSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat(token);
    await this.save();
    return token;
  } catch (e) {
    console.log("error in generating tokens");
  }
};

const User = mongoose.model("users", userSchema);

export default User;