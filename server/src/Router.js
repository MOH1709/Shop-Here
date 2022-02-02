import bcrypt from "bcryptjs";
import { Router } from "express";
import mailTranspoter from "./MailText.js";
import { City, Area, Shop, User, Order } from "./models/index.js";

const router = Router();

//-----------------------------------------------> test router
router.get("/test", async(req, res) => {
  try {
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send("error in testing");
  }
});

//-----------------------------------------------> Clean Cities
router.get("/cleancities", async(req, res) => {
  try {
    const cities = await City.find({}, { name: 1 });

    res.status(200).send(cities);
  } catch (e) {
    res.status(500).send("error in geting cities name");
  }
});

//-----------------------------------------------> clean areas
router.get("/:cityId/areas", async(req, res) => {
  try {
    const { cityId } = req.params;
    const { areas } = await City.findOne({ _id: cityId }, { areas: 1 });

    res.status(200).send(areas);
  } catch (e) {
    res.status(501).send("error in getting area names");
  }
});

// add new areas
router.post("/:cityId/areas", async(req, res) => {
  try {
    const { cityId } = req.params;
    const { areaName, address, img } = req.body;
    const { areas } = await City.findOne({ _id: cityId }, { _id: 0, areas: 1 });

    const isExist = areas.find((data) => {
      return data.name === areaName && data.address === address;
    });

    if (isExist || !areaName || !address) {
      return res.status(400).send("invalid credintials adding new area");
    }

    function postImg() {}

    const area = new Area({ shops: [] });
    area.save();

    await City.updateOne({ _id: cityId }, {
      $push: {
        areas: {
          id: area["_id"],
          address: address,
          name: areaName,
        },
      },
    });

    res.status(200).send(`${areaName} added successfully`);
  } catch (e) {
    res.status(500).send("error in adding new area \n");
  }
});

//-----------------------------------------------> clean Shops
router.get("/:cityId/:areaId/shops", async(req, res) => {
  try {
    const { areaId } = req.params;
    const { shops } = await Area.findOne({ _id: areaId }, { _id: 0 });

    res.status(200).send(shops);
  } catch (e) {
    res.status(500).send("error in getting area names");
  }
});

// get owner data
router.get("/:bid/getownerdata", async(req, res) => {
  try {
    const { bid } = req.params;
    const owner = await Shop.findOne({ _id: bid }, { _id: 0, products: 0, orders: 0 });

    res.status(200).send(owner);
  } catch (e) {
    res.status(500).send("error in getting area names");
  }
});

//check if urgent order available
router.get("/:shopId/isurgentavail", async(req, res) => {
  try {
    const { shopId } = req.params;
    const { canUrgent } = await Shop.findOne({ _id: shopId }, { _id: 0, canUrgent: 1 });

    res.status(200).send(canUrgent);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

// shop detail update
router.put("/:bid/updateShopDetails", async(req, res) => {
  try {
    const data = req.body;
    const { bid } = req.params;
    const owner = await Shop.findOne({ _id: bid });

    const result = Object.assign(owner, data);

    await Shop.updateOne({ _id: owner._id }, {
      $set: {
        ...result,
      },
    });

    res.status(200).send("business data updated");
  } catch (e) {
    res.status(400).send("error in updating business data details");
  }
});

// add new Shop
router.post("/:cityId/:areaId/shops", async(req, res) => {
  try {
    res.status(200).send(`added successfully`);
  } catch (e) {
    res.status(500).send("error in adding new shop \n");
  }
});

//-----------------------------------------------> products
router.get("/:shopId/withproducts", async(req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findOne({ _id: shopId }, { _id: 0, extras: 1, isOpen: 1, products: 1 });

    res.status(200).send(shop);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

// add products of shop
router.post("/:bid/products", async(req, res) => {
  try {
    const { bid } = req.params;
    const newProducts = req.body;

    await Shop.updateOne({ _id: bid }, {
      $push: {
        products: newProducts,
      },
    });

    res.status(200).send(`product saves successfully`);
  } catch (e) {
    res.status(500).send("error in adding products");
  }
});
//edit product
router.put("/:bid/products", async(req, res) => {
  try {
    const { bid } = req.params;
    const product = req.body;

    await Shop.updateOne({ _id: bid, "products._id": product._id }, {
      $set: {
        "products.$": product,
      },
    });

    res.status(200).send(`product edited successfully`);
  } catch (e) {
    console.log(e);

    res.status(500).send("error in edited products");
  }
});
//delete product
router.delete("/:bid/products/:_id", async(req, res) => {
  try {
    const { bid, _id } = req.params;

    await Shop.updateOne({ _id: bid }, {
      $pull: {
        products: { _id },
      },
    });

    res.status(200).send(`product deleted successfully`);
  } catch (e) {
    res.status(500).send("error in deleted products");
  }
});

//-----------------------------------------------> Clean city Contributor
router.get("/city/:uxt/user", async(req, res) => {
  try {
    const { uxt } = req.params;
    const user = await User.findOne({ tokens: { $in: uxt } }, { _id: 0, tokens: 0 });

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("error in getting user data");
  }
});

router.get("/login/:userId/:password", async(req, res) => {
  try {
    const { userId, password } = req.params;
    const user = await User.findOne({ userId });
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = await user.generateAuthToken();
      res.cookie("ux", token);
      res.cookie("ci", user.currentLocation[0]);
      res.cookie("ai", user.currentLocation[1]);
      res.cookie("un", user.name);
      res.cookie("fa", user.address);
      res.cookie("bx", user.bussinessId);

      return res.status(200).send(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    res.status(400).send("error in logging in");
  }
});

router.delete("/:uxt/deleteToken", async(req, res) => {
  try {
    const { uxt } = req.params;
    const user = await User.updateOne({ tokens: { $in: uxt } }, {
      $pull: {
        tokens: uxt,
      },
    });

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("error in getting user data");
  }
});

router.post("/:cityId/:areaId/signin", async(req, res) => {
  try {
    const { areaId, cityId } = req.params;
    const { name, phoneNumber, address, password, userId } = req.body;

    const isExist = await User.findOne({ userId }, { _id: 1 });

    if (isExist) {
      return res.status(400).send("Invalid credentials for adding users");
    }

    const user = new User({
      userId,
      name,
      password,
      phoneNumber,
      currentLocation: [cityId, areaId],
      address,
    });
    // info: schema.pre is used to deal with password hashing
    //   before save in userSchema module
    await user.save();

    const token = await user.generateAuthToken();
    res.cookie("ux", token);

    res.status(200).send("user added successfully");
  } catch (e) {
    console.log(e);

    res.status(400).send("error in user route");
  }
});
// user update
router.put("/:uxt/updateUser", async(req, res) => {
  try {
    const { state } = req.body;
    const { uxt } = req.params;
    const user = await User.findOne({ tokens: { $in: uxt } });

    if (state.password) {
      state.password = await bcrypt.hash(state.password, 12);
    }

    const result = Object.assign(user, state);

    await User.updateOne({ _id: user._id }, {
      $set: {
        ...result,
      },
    });

    res.status(200).send("user updated");
  } catch (e) {
    res.status(400).send("error in updating user details");
  }
});

//-----------------------------------------------> orders
router.get("/:uxt/orders", async(req, res) => {
  try {
    const { uxt } = req.params;

    const { orders } = await User.findOne({ tokens: { $in: uxt } }, { _id: 0, orders: 1 });

    res.status(200).send(orders);
  } catch (e) {
    console.log(e);

    res.status(400).send("error in placing order backend");
  }
});
//get order details
router.get("/:oid/orderdetails", async(req, res) => {
  try {
    const { oid } = req.params;

    const details = await Order.findOne({ _id: oid }, { _id: 0 });

    res.status(200).send(details);
  } catch (e) {
    res.status(400).send(details);
  }
});
// place new order
router.post("/:uxt/orders", async(req, res) => {
  try {
    const { uxt } = req.params;
    const { products, owner, ownerId, recievedAddress, isUrgent } = req.body;

    const reciever = await User.findOne({ tokens: { $in: uxt } }, { _id: 1, name: 1 });

    const order = new Order({
      products,
      ownerId,
      isUrgent,
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
          address: recievedAddress,
          reciever: reciever.name,
        },
      },
    });

    res.status(200).send("order placed successfully");
  } catch (e) {
    console.log(e);

    res.status(400).send("error in placing order backend");
  }
});

//check order pin
router.get("/:bid/getBusinessOrders", async(req, res) => {
  try {
    const { bid } = req.params;

    const result = await Shop.findOne({ _id: bid }, { _id: 0, orders: 1 });

    res.status(200).send(result);
  } catch (e) {
    console.log(e);

    res.status(400).send("error in obtaning messages");
  }
});

//check order pin
router.get("/:oid/checkorderpin", async(req, res) => {
  try {
    const { oid } = req.params;

    const { recieverId } = await Order.findOne({ _id: oid }, { _id: 0, recieverId: 1 });
    const { orders } = await User.findOne({ _id: recieverId }, { _id: 0, orders: { $elemMatch: { _id: oid } } });

    res.status(200).send(orders[0]);
  } catch (e) {
    res.status(400).send("error in getting pin");
  }
});

//set ordered status to dilivered order pin
router.put("/:oid/:bid/orderDilivered", async(req, res) => {
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

//-----------------------------------------------> send email
router.post("/mail", async(req, res) => {
  try {
    const { text, to, subject } = req.body;
    await mailTranspoter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    res.status(200).send("message send succesfully");
  } catch (e) {
    console.log(e);

    res.status(400).send("error in updating user details");
  }
});

export default router;