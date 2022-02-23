import nodemailer from "nodemailer";

const mailTranspoter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

function mail({ to, subject, text }) {
  mailTranspoter.sendMail({
      from: "test1234@gmail.com",
      to,
      subject,
      text: text.toString(),
    },
    (e, i) => {
      if (e) {
        console.log(e);
      }
    }
  );
}

export default mail;