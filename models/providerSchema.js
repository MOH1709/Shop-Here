import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "clean city Contributor",
  },
  profileImg: {
    type: String,
    default: "logo.png",
  },
  productImgs: {
    type: Array,
  },
  occupation: {
    type: String,
  },
  reviews: {
    type: Number,
    max: 5,
    default: 5,
  },
  noOfUsers: {
    type: Number,
    default: 0,
  },
});

const Provider = mongoose.model("providers", providerSchema);

export default Provider;