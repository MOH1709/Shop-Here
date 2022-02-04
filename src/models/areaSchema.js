import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  shops: {
    type: Array,
  },
  test: {
    type: String,
  },
});

const Area = mongoose.model("areas", areaSchema);

export default Area;