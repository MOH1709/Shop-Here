import { Router } from "express";
import mailTranspoter from "../MailText.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

//-----------------------------------------------> Clean Cities
router.get("/test", async(req, res) => {
  try {
    res.status(200).send("test");
  } catch (e) {
    res.status(500).send("error in geting cities name");
  }
});

//-----------------------------------------------> upload image
router.post("/upload/image/:ui", async(req, res) => {
  try {
    const { ui } = req.params;
    const { img } = req.files;
    const imgName = `${ui}.${img.mimetype.split("/")[1]}`;

    img.mv(`${__dirname}/../../client/public/uploads/${imgName}`, (e) => {
      e && console.log("error in saving image : ", e);
    });

    res.status(200).send({ filePath: `./uploads/${imgName}` });
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