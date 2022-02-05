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

//-----------------------------------------------> add new area
router.post("/:cid", async(req, res) => {
  try {
    const { cid } = req.params;
    const { state } = req.body;

    const area = new Area({ shops: [] });
    area.save();

    await City.updateOne({ _id: cid }, {
      $push: {
        areas: {
          _id: area._id,
          ...state,
        },
      },
    });

    res.status(200).send(`${state.name} added successfully`);
  } catch (e) {
    res.status(500).send("error in adding new area \n");
  }
});

//-----------------------------------------------> eidt areas
router.put("/:aid", async(req, res) => {
  try {
    const { aid } = req.params;
    const { state } = req.body;

    await Area.updateOne({ _id: aid }, { $set: state });

    res.status(200).send("area updated successfully");
  } catch (e) {
    res.status(501).send("error in updating areas");
  }
});

export default router;