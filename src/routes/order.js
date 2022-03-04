import { Router } from "express";
import { sendMail } from "../utils/google.js";
import { Order, User, Shop, Product } from "../models/index.js";

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

//-----------------------------------------------> get orders of particular shop
router.get("/shop/:sid", async(req, res) => {
  try {
    const { sid } = req.params;

    const orders = await Order.find({ ownerId: sid });

    res.status(200).send(orders);
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
    const { extras } = await Shop.findOne({ _id: ownerId }, { _id: 1, extras: 1 });

    sendMail({
        to: extras[1].email,
        subject: `You Got An Order from ${reciever.name}`,
        text: "click this link to check https://powerful-atoll-15577.herokuapp.com/city/owner/messages",
      })
      .then((res) => {
        console.log("response", res);
      })
      .catch((e) => {
        console.log("error n sending mail of order", e);
      });

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

    products.forEach(async(data) => {
      await Product.updateOne({ _id: data._id }, {
        $inc: { quantity: -data.quantity },
      });
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
    const { recieverId } = await Order.findOne({ _id: oid }, { recieverId: 1, _id: 0 });

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

    await User.updateOne({ _id: recieverId }, {
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