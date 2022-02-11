import { Router } from "express";
import webpush from "web-push";
import mailTranspoter from "../MailText.js";

const router = Router();

//-----------------------------------------------> display notification
const publicVapidKey = process.env.PUBLIC_KEY;
const privateVapidKey = process.env.PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

router.post("/notify", (req, res) => {
  const { subscription, title, message } = req.body;
  const payload = JSON.stringify({ title, message });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error("err", err));

  res.status(200).json({ success: true });
});

//-----------------------------------------------> upload image
router.post("/upload/image/:ui", async(req, res) => {
  try {
    // const { ui } = req.params;
    // const { img } = req.files;
    // const imgName = `${ui}.${img.mimetype.split("/")[1]}`;

    // img.mv(`${__dirname}/../../client/public/uploads/${imgName}`, (e) => {
    //   e && console.log("error in saving image : ", e);
    // });

    res.status(200).send({ filePath: `./uploads/test` });
  } catch (e) {
    res.status(400).send("error in uploading photos");
  }
});

//-----------------------------------------------> send email
router.post("/mail", async(req, res) => {
  try {
    const { text, to, subject } = req.body;
    await mailTranspoter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    res.status(200).send("message send succesfully");
  } catch (e) {
    res.status(400).send("error in updating user details");
  }
});

export default router;