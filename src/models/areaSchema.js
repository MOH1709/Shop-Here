import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cityId: {
    type: String,
    required: true,
  },
  shops: {
    type: Array,
  },
});

const Area = mongoose.model("areas", areaSchema);

export default Area;