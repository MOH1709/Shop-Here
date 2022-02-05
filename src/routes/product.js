import { Router } from "express";
import { Shop } from "../models/index.js";

const router = Router();

//----------------------------------------------->  edit product
router.put("/:bid", async(req, res) => {
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
    res.status(500).send("error in edited products");
  }
});

//----------------------------------------------->  add products of shop
router.post("/:bid", async(req, res) => {
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

//-----------------------------------------------> delete product
router.delete("/:bid/:product_id", async(req, res) => {
  try {
    const { bid, product_id } = req.params;

    await Shop.updateOne({ _id: bid }, {
      $pull: {
        products: { _id: product_id },
      },
    });

    res.status(200).send(`product deleted successfully`);
  } catch (e) {
    res.status(500).send("error in deleted products");
  }
});

export default router;