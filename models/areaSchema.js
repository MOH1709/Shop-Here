import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  img: {
    type: String,
  },
  shops: {
    type: Array,
  },
});

const Area = mongoose.model("areas", areaSchema);

export default Area;