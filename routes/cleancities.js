import { Router } from "express";
import { City } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get cleancities
router.get("/cleancities", async(req, res) => {
  try {
    const cities = await City.find({}, { _id: 0, name: 1 });

    res.status(200).send(cities.map((city) => city.name));
  } catch (e) {
    res.status(400).send("error in loading cities name");
  }
});

export default router;