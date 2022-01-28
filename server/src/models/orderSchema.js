import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderedTime: {
    type: String,
    default: new Date().toString(),
  },
  recievedTime: {
    type: String,
    default: new Date().toString(),
  },
  ownerId: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true,
  },
  recievedAddress: {
    type: String,
    required: true,
  },
  isSucessful: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;