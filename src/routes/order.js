import { Router } from "express";
import { Order, User, Shop } from "../models/index.js";

const router = Router();

//-----------------------------------------------> get order details
router.get("/:oid", async(req, res) => {
  try {
    const { oid } = req.params;

    const details = await Order.findOne({ _id: oid }, { _id: 0 });

    res.status(200).send(details);
  } catch (e) {
    res.status(400).send(details);
  }
});

//----------------------------------------------->  place order
router.post("/:uxt", async(req, res) => {
  try {
    const { uxt } = req.params;
    const { products, owner, ownerId, recievedAddress, isUrgent } = req.body;

    const reciever = await User.findOne({ tokens: { $in: uxt } }, { _id: 1, name: 1 });

    const order = new Order({
      products,
      ownerId,
      recieverId: reciever._id,
      recievedAddress,
    });
    const { _id } = await order.save();

    await User.updateOne({ tokens: { $in: uxt } }, {
      $push: {
        orders: {
          orderPin: Math.floor(Math.random() * 8500 + 1000),
          _id,
          owner,
        },
      },
    });

    await Shop.updateOne({ _id: ownerId }, {
      $push: {
        orders: {
          _id,
          isUrgent,
          address: recievedAddress,
          reciever: reciever.name,
        },
      },
    });

    res.status(200).send("order placed successfully");
  } catch (e) {
    res.status(400).send("error in placing order backend");
  }
});

//-----------------------------------------------> check order pin
router.get("/checkorderpin/:oid", async(req, res) => {
  try {
    const { oid } = req.params;

    const { recieverId } = await Order.findOne({ _id: oid }, { _id: 0, recieverId: 1 });
    const { orders } = await User.findOne({ _id: recieverId }, { _id: 0, orders: { $elemMatch: { _id: oid } } });

    res.status(200).send(orders[0]);
  } catch (e) {
    res.status(400).send("error in getting pin");
  }
});

//-----------------------------------------------> set ordered status to dilivered order pin
router.put("/setorderDelivered/:oid/:bid", async(req, res) => {
  try {
    const { oid, bid } = req.params;

    await Order.updateOne({ _id: oid }, {
      $set: {
        isSucessful: true,
        recievedTime: new Date(),
      },
    });

    await Shop.updateOne({ _id: bid }, {
      $pull: {
        orders: { _id: oid },
      },
    });

    res.status(200).send("success");
  } catch (e) {
    res.status(400).send("error in getting pin");
  }
});

export default router;