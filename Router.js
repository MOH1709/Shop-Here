import { Router } from "express";
import { City, Area, Shop } from "./models/index.js";

const router = Router();

//-----------------------------------------------> Clean Cities
router.get("/cleancities", async(req, res) => {
  try {
    const cities = await City.find({}, { _id: 0, name: 1 });

    res.status(200).send(cities.map((city) => city.name));
  } catch (e) {
    res.status(500).send("error in geting cities name");
  }
});

//-----------------------------------------------> Clean Areas
router.get("/cleancities/areas", async(req, res) => {
  try {
    const { cityName } = req.body;
    const { areas } = await City.findOne({ name: cityName }, { _id: 0, areas: 1 });

    res.status(200).send(areas);
  } catch (e) {
    res.status(500).send("error in getting area names");
  }
});

router.put("/cleancities/areas", async(req, res) => {
  try {
    const { cityName, areaName, address } = req.body;
    const { areas } = await City.findOne({ name: cityName }, { _id: 0, areas: 1 });

    const isExist = areas.find((data) => {
      return data.name === areaName && data.address === address;
    });

    if (isExist) {
      return res.status(400).send("this area already exist");
    }

    const area = await Area.insertMany([{
      shops: [],
    }, ]);

    await City.updateOne({ name: cityName }, {
      $push: {
        areas: {
          id: area[0]["_id"],
          address: address || cityName,
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
router.get("/cleancities/areas/shops", async(req, res) => {
  try {
    const { areaId } = req.body;
    const { shops } = await Area.findOne({ _id: areaId }, { _id: 0 });

    res.status(200).send(shops);
  } catch (e) {
    res.status(500).send("error in getting area names");
  }
});

router.put("/cleancities/areas/shops", async(req, res) => {
  try {
    const { areaId, shopName, address, img } = req.body;
    const { shops } = await Area.findOne({ _id: areaId }, { _id: 0 });

    const isExist = shops.find((data) => {
      return data.name === shopName && data.address === address;
    });

    if (isExist) {
      return res.status(400).send("this shop already exist");
    }

    const shop = await Shop.insertMany([{
      products: [],
      isOpen: true,
      urgentDeliveryStatus: true,
      tempBan: false,
      urgentDeliveredCount: 0,
      dayJoined: new Date(),
      daysLeft: 0,
    }, ]);

    await Area.updateOne({ _id: areaId }, {
      $push: {
        shops: {
          name: shopName,
          id: shop[0]["_id"],
          img,
          address: address,
        },
      },
    });

    res.status(200).send(`${shopName} added successfully`);
  } catch (e) {
    res.status(500).send("error in adding new shop \n");
  }
});

//-----------------------------------------------> products
router.get("/cleancities/areas/shops/products", async(req, res) => {
  try {
    const { shopId } = req.body;
    const { products } = await Shop.findOne({ _id: shopId }, { _id: 0, products: 1 });

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send("error in getting products");
  }
});

router.put("/cleancities/areas/shops/products", async(req, res) => {
  try {
    const { shopId, newProducts } = req.body;
    await Shop.updateOne({ _id: shopId }, {
      $push: {
        products: { $each: [...newProducts] },
      },
    });

    res.status(200).send(`product saves successfully`);
  } catch (e) {
    res.status(500).send("error in adding products");
  }
});

export default router;