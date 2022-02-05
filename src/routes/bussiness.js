import { Router } from "express";
import { Shop, Area, Order } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get owner data
router.get("/:bid", async(req, res) => {
  try {
    const { bid } = req.params;
    const owner = await Shop.findOne({ _id: bid }, { _id: 0, products: 0, orders: 0 });

    res.status(200).send(owner);
  } catch (e) {
    res.status(500).send("error in getting area names");
  }
});

//-----------------------------------------------> get owner data set visible users
router.get("/uservisible/:bid", async(req, res) => {
  try {
    const { bid } = req.params;
    const shop = await Shop.findOne({ _id: bid }, { _id: 0, extras: 1, isOpen: 1, products: 1 });

    res.status(200).send(shop);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

//-----------------------------------------------> get shop avail areas
router.get("/shopareas/:bid", async(req, res) => {
  try {
    const { bid } = req.params;

    const areas = await Shop.findOne({ _id: bid }, { _id: 0, areas: 1 });

    res.status(200).send(areas);
  } catch (e) {
    res.status(500).send("error in getting shop areas");
  }
});

//-----------------------------------------------> get is urgent order avail confirmation
router.get("/isurgentavail/:bid", async(req, res) => {
  try {
    const { bid } = req.params;
    const { canUrgent } = await Shop.findOne({ _id: bid }, { _id: 0, canUrgent: 1 });

    res.status(200).send(canUrgent);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

//-----------------------------------------------> get owner orders
router.get("/orders/:bid", async(req, res) => {
  try {
    const { bid } = req.params;

    const result = await Shop.findOne({ _id: bid }, { _id: 0, orders: 1 });

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send("error in obtaning messages");
  }
});

//----------------------------------------------->  shop detail update
router.put("/:bid", async(req, res) => {
  try {
    const data = req.body;
    const { bid } = req.params;

    await Shop.updateOne({ _id: bid }, { $set: data });

    await Area.updateMany({ _id: { $in: data.areas }, "shops._id": bid }, {
      $set: {
        "shops.$": {
          _id: bid,
          img: data.img,
          name: data.name,
          address: data.address,
        },
      },
    });

    res.status(200).send("business data updated");
  } catch (e) {
    console.log(e);

    res.status(400).send("error in updating business data details");
  }
});

//----------------------------------------------->  delete shops
router.post("/shopareas/:bid", async(req, res) => {
  try {
    const { bid } = req.params;
    const { rmareas, selectedAreas } = req.body;

    await Area.updateMany({ _id: { $in: rmareas } }, {
      $pull: { shops: { _id: bid } },
    });

    await Area.updateMany({ _id: { $in: selectedAreas } }, {
      $push: { shops: { _id: bid } },
    });

    res.status(200).send(`deleted successfully`);
  } catch (e) {
    res.status(500).send("error in deleting new shop \n");
  }
});

export default router;