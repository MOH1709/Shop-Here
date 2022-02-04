import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderedTime: {
    type: String,
    default: new Date().toString(),
  },
  recievedTime: {
    type: String,
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
  products: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }, ],
  isUrgent: {
    type: Boolean,
    default: false,
  },
  isSucessful: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;