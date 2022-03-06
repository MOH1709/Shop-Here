import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  img: {
    type: String,
  },
  extras: [{
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
  }, ],
  minOrderValue: {
    type: Number,
    default: 10,
  },
  orders: [{
    address: {
      type: String,
    },
    reciever: {
      type: String,
      required: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
  }, ],
  areas: {
    type: Array,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  canUrgent: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

shopSchema.methods.generateAuthToken = async function() {
  try {
    this.token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    await this.save();
    return token;
  } catch (e) {
    console.log("error in generating tokens");
  }
};

const Shop = mongoose.model("shops", shopSchema);

export default Shop;