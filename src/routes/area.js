import { Router } from "express";
import { City, Area } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get shops in given area
router.get("/bussinesses/:aid", async(req, res) => {
  try {
    const { aid } = req.params;
    const { shops } = await Area.findOne({ _id: aid });

    res.status(200).send(shops);
  } catch (e) {
    console.log(e);

    res.status(500).send("error in getting shops in this area");
  }
});

export default router;