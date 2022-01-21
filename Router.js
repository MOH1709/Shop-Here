import bcrypt from "bcryptjs";
import { Router } from "express";
import { City, Area, Shop, User } from "./models/index.js";

const router = Router();

//-----------------------------------------------> Clean Cities
router.get("/cleancities", async(req, res) => {
  try {
    const cities = await City.find({}, { name: 1 });

    res.status(200).send(cities);
  } catch (e) {
    res.status(500).send("error in geting cities name");
  }
});

//-----------------------------------------------> Clean Areas
router.get("/:cityId/areas", async(req, res) => {
  try {
    const { cityId } = req.params;
    const { areas } = await City.findOne({ _id: cityId }, { areas: 1 });

    res.status(200).send(areas);
  } catch (e) {
    console.log(e);

    res.status(500).send("error in getting area names");
  }
});

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

router.post("/:cityId/:areaId/shops", async(req, res) => {
  try {
    const { areaId } = req.params;
    const { userId, address, img, shopName } = req.body;
    const { shops } = await Area.findOne({ _id: areaId }, { _id: 0 });

    const isExist = shops.find((data) => {
      return data.id === userId;
    });

    if (isExist || !userId || !shopName || !address) {
      return res.status(400).send("invalid credintials for adding shop");
    }
    const shop = new Shop({
      _id: userId,
      products: [],
      isOpen: true,
      urgentDeliveryStatus: true,
      tempBan: false,
      urgentDeliveredCount: 0,
      dayJoined: new Date(),
      daysLeft: 0,
    });
    await shop.save();

    await Area.updateOne({ _id: areaId }, {
      $push: {
        shops: {
          img,
          address,
          id: userId,
          name: shopName,
        },
      },
    });

    res.status(200).send(`${shopName} added successfully`);
  } catch (e) {
    console.log(e);

    res.status(500).send("error in adding new shop \n");
  }
});

//-----------------------------------------------> products
router.get("/:userId/shop/products", async(req, res) => {
  try {
    const { userId } = req.params;
    const { products } = await Shop.findOne({ _id: userId }, { _id: 0, products: 1 });

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

router.put("/:userId/shop/products", async(req, res) => {
  try {
    const { userId } = req.params;
    const { newProducts } = req.body;
    await Shop.updateOne({ _id: userId }, {
      $set: {
        products: newProducts,
      },
    });

    res.status(200).send(`product saves successfully`);
  } catch (e) {
    res.status(500).send("error in adding products");
  }
});

//-----------------------------------------------> Clean city Contributor
router.get("/:cityId/login", async(req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = await user.generateAuthToken();
      res.cookie("jwt", token);
      return res.status(200).send(user);
    } else {
      res.status(400).send("Invalid Credentials for login");
    }
  } catch (e) {
    res.status(400).send("error in logging in");
  }
});

router.put("/:userId/logout", async(req, res) => {
  try {
    const { userId } = req.params;
    const { token } = req.body;

    await User.updateOne({ userId }, {
      $set: {
        tokens: [token],
      },
    });

    res.status(200).send("logout successfull");
  } catch (e) {
    console.log(e);

    res.status(400).send("error while loggin out");
  }
});

router.post("/:cityId/:areaId/signin", async(req, res) => {
  try {
    const { areaId } = req.params;
    const { userId, name, type, phoneNumber, address, password } = req.body;

    const isExist = await User.findOne({ userId }, { _id: 1 });

    if (isExist) {
      return res.status(400).send("Invalid credentials for adding users");
    }

    const user = new User({
      userId,
      password,
      name,
      type,
      phoneNumber,
      areaId,
      address,
    });
    // info: schema.pre is used to deal with password hashing
    //   before save in userSchema module
    await user.save();

    // res.cookie(user._id, "test");
    res.status(200).send("user added successfully");
  } catch (e) {
    res.status(400).send("error in user route");
  }
});

router.put("/:userId/update", async(req, res) => {
  try {
    const { userId, name, password, type, phoneNumber, areaId, address } =
    req.body;
    const user = await User.findOne({ userId });

    const hashedPass = await bcrypt.hash(password, 12);

    await User.updateOne({ userId }, {
      $set: {
        name: name || user.name,
        password: hashedPass,
        type: type || user.type,
        phoneNumber: phoneNumber || user.phoneNumber,
        areaId: areaId || user.areaName,
        address: address || user.address,
      },
    });

    res.status(200).send("user updated");
  } catch (e) {
    res.status(400).send("error in updating user details");
  }
});

router.get("/test", (req, res) => {
  res.status(200).send("hii my self mohit");
});

export default router;