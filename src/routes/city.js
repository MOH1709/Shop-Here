import { Router } from "express";
import { City, Area } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get Cities
router.get("/", async(req, res) => {
  try {
    const cities = await City.find({}, { name: 1 });

    res.status(200).send(cities);
  } catch (e) {
    res.status(500).send("error in geting cities name");
  }
});

//-----------------------------------------------> get areas
router.get("/areas/:cid", async(req, res) => {
  try {
    const { cid } = req.params;

    const areas = await Area.find({ cityId: cid }, { img: 1, name: 1, address: 1 });

    res.status(200).send(areas);
  } catch (e) {
    res.status(501).send("error in getting area names");
  }
});

export default router;