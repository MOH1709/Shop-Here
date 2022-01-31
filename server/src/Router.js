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

router.get("/:cityId/areas", async(req, res) => {
  try {
    const { cityId } = req.params;
    const { areas } = await City.findOne({ _id: cityId }, { areas: 1 });

    res.status(200).send(areas);
  } catch (e) {
    res.status(501).send("error in getting area names");
  }
});

//-----------------------------------------------> clean areas
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

//-----------------------------------------------> shops
router.post("/:cityId/:areaId/shops", async(req, res) => {
  try {
    res.status(200).send(`added successfully`);
  } catch (e) {
    res.status(500).send("error in adding new shop \n");
  }
});

//-----------------------------------------------> products
router.get("/:shopId/products", async(req, res) => {
  try {
    const { shopId } = req.params;
    const { products } = await Shop.findOne({ _id: shopId }, { _id: 0, products: 1 });

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

router.post("/:cityId/:userId/products", async(req, res) => {
  try {
    const { userId } = req.params;
    const newProducts = req.body;

    await Shop.updateOne({ _id: userId }, {
      $push: {
        products: newProducts,
      },
    });

    res.status(200).send(`product saves successfully`);
  } catch (e) {
    res.status(500).send("error in adding products");
  }
});

router.delete("/:cityId/:userId/products", async(req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    await Shop.updateOne({ _id: userId }, {
      $pull: {
        products: { _id: productId },
      },
    });

    res.status(200).send(`product deleted successfully`);
  } catch (e) {
    res.status(500).send("error in adding products");
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

      return res.status(200).send(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    res.status(400).send("error in logging in");
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

router.get("/:oid/orderdetails", async(req, res) => {
  try {
    const { oid } = req.params;

    const details = await Order.findOne({ _id: oid }, { _id: 0 });

    res.status(200).send(details);
  } catch (e) {
    res.status(400).send("error in placing order backend");
  }
});

router.post("/:uxt/orders", async(req, res) => {
  try {
    const { uxt } = req.params;
    const { products, owner, ownerId, recievedAddress } = req.body;

    const recieverId = await User.findOne({ tokens: { $in: uxt } }, { _id: 1 });

    const order = new Order({
      products,
      ownerId,
      recieverId: recieverId._id,
      recievedAddress,
    });
    const { _id } = await order.save();

    await User.updateOne({ tokens: { $in: uxt } }, {
      $push: {
        orders: {
          orderId: _id,
          owner,
        },
      },
    });

    res.status(200).send("order placed successfully");
  } catch (e) {
    console.log(e);

    res.status(400).send("error in placing order backend");
  }
});

//-----------------------------------------------> send email
router.post("/mail", async(req, res) => {
  try {
    const { text, to, subject } = req.body;
    const response = await mailTranspoter.sendMail({
      from: "cleancity1507@gmail.com",
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