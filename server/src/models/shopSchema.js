import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  products: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    MRP: {
      type: Number,
    },
    img: {
      type: String,
    },
    des: {
      type: String,
      default: "",
    },
    isAdded: {
      type: Boolean,
      default: false,
    },
  }, ],
  isOpen: {
    type: Boolean,
    default: true,
  },
  urgentDeliveryStatus: {
    type: Boolean,
    default: false,
  },
  tempBan: {
    type: Boolean,
    default: false,
  },
  urgentDeliveredCount: {
    type: Number,
    default: 0,
  },
  dayJoined: {
    type: String,
    // default: new Date().toDateString(),
  },
  daysLeft: {
    type: Number,
    default: 28,
  },
});

const Shop = mongoose.model("shops", shopSchema);

export default Shop;