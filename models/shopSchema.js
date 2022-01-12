import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  products: {
    type: Array,
    // {
    //   name: "",
    //   price: 0,
    //   MRP: 0,
    //   img || des: "",
    //   cateogory: "",
    // },
  },
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