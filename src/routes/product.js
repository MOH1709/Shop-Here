import { Router } from "express";
import { Product } from "../models/index.js";

const router = Router();

//-----------------------------------------------> search in city
router.post("/:cid", async(req, res) => {
  try {
    const { cid } = req.params;
    const { text } = req.body;

    const products = await Product.find({
      name: { $regex: text, $options: "i" },
      cityId: cid,
    });

    res.status(200).send(products);
  } catch (e) {
    console.log(e);

    res.status(500).send("error in searching product");
  }
});

//----------------------------------------------->  edit product
router.put("/:bid", async(req, res) => {
  try {
    const { bid } = req.params;
    const product = req.body;

    await Product.updateOne({ _id: product._id, businessId: bid }, {
      $set: product,
    });

    res.status(200).send(`product edited successfully`);
  } catch (e) {
    res.status(500).send("error in edited products");
  }
});

//----------------------------------------------->  add products of shop
router.post("/:cid/:bid", async(req, res) => {
  try {
    const { bid, cid } = req.params;
    const newProducts = req.body;

    const product = new Product({
      ...newProducts,
      businessId: bid,
      cityId: cid,
    });
    await product.save();

    res.status(200).send({ _id: product._id });
  } catch (e) {
    res.status(500).send("error in adding products");
  }
});

//-----------------------------------------------> delete product
router.delete("/:bid/:_id", async(req, res) => {
  try {
    const { bid, _id } = req.params;

    await Product.deleteOne({ _id, businessId: bid });

    res.status(200).send(`product deleted successfully`);
  } catch (e) {
    res.status(500).send("error in deleted products");
  }
});

export default router;