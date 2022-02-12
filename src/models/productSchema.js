import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cityId: {
    type: String,
    required: true,
  },
  businessId: {
    type: String,
    required: true,
  },
  MRP: {
    type: Number,
  },
  category: {
    type: String,
  },
  img: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("products", productSchema);

export default Product;