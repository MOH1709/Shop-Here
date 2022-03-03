import { Router } from "express";
import { Otp } from "../models/index.js";
import { sendMail } from "../utils/google.js";

const router = Router();

//-----------------------------------------------> get otp
router.get("/:userId/:otp", async(req, res) => {
  try {
    const { userId, otp } = req.params;
    const response = await Otp.findOne({ userId }, { otp: 1 });

    res.status(200).send({ isMatch: otp == response.otp });
  } catch (e) {
    res.status(500).send("error in geting otp");
  }
});

//-----------------------------------------------> get Cities
router.delete("/:userId", async(req, res) => {
  try {
    const { userId } = req.params;
    await Otp.deleteOne({ userId });

    res.status(200).send("done");
  } catch (e) {
    res.status(500).send("error in geting otp");
  }
});

//-----------------------------------------------> get areas
router.post("/", async(req, res) => {
  try {
    const { userId } = req.body;
    const otp = Math.floor(Math.random() * 900000 + 10000);

    await sendMail({
      text: otp,
      to: userId + "@gmail.com",
      subject: "SHOP HERE OTP CONFIRMATION CODE",
    });

    const user = new Otp({
      userId,
      otp,
    });
    user.save();

    res.status(200).send("otp success");
  } catch (e) {
    res.status(501).send("error in sendind otp");
  }
});

export default router;