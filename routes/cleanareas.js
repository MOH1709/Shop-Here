import { Router } from "express";
import { City, Area } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get areas of city
router.get("/cleanareas", async(req, res) => {
  try {
    const cities = await City.findOne({ "name": req.body.cityName }, { _id: 0 });

    res.status(200).send(cities);
  } catch (e) {
    res.status(400).send("error in loading areas in this city");
  }
});

//-----------------------------------------------> add area in given city
router.put("/cleanareas", async(req, res) => {
  try {
    const { cityName, newArea } = req.body;
    const { areas } = await City.findOne({ name: cityName });

    if (areas.includes(newArea)) {
      return res.status(200).send("area already exists");
    }

    await City.updateOne({ name: cityName }, { $push: { areas: newArea } });
    await Area.insertMany([{ name: newArea }]);
    res.status(200).send("new area added successfully");
  } catch (e) {
    res.status(400).send("error in adding area in this city");
  }
});

export default router;