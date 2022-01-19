import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  shops: {
    type: Array,
  },
});

const Area = mongoose.model("areas", areaSchema);

export default Area;