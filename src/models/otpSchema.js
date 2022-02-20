import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  expireAt: {
    type: Date,
    default: Date.now(),
    expires: 3000,
  },
  userId: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const Otp = mongoose.model("otps", otpSchema);

export default Otp;