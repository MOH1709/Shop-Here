import nodemailer from "nodemailer";
import "dotenv/config";

const mailTranspoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cleancity1507@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

// const details = {
//   from: "cleancity1507@gmail.com",
//   to: "ahirwalmohit1709@gmail.com",
//   subject: "testing email code",
//   text: "helloooooooooooo",
// };

// mailTranspoter.sendMail(details);

export default mailTranspoter;