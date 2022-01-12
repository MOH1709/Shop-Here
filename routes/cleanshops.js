import { Router } from "express";
import { Area } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get shops near by
router.get("/cleanshops", async(req, res) => {
  try {
    const { areaName } = req.body;

    const { shops } = await Area.findOne({ name: areaName });
    res.status(200).send(shops);
  } catch (e) {
    res.status(400).send("shops are not available in this area");
  }
});

//-----------------------------------------------> including ahop in given area
router.put("/cleanshops", async(req, res) => {
  try {
    const { areaName, shopProfile } = req.body;

    await Area.updateOne({ name: areaName }, { $push: { shops: shopProfile } })
    res.status(200).send("shop added successfully");
  } catch (e) {
    res.status(400).send("unable to add shop this time");
  }
});


export default router;