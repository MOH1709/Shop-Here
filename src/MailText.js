import nodemailer from "nodemailer";
import "dotenv/config";

const mailTranspoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export default mailTranspoter;