import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shops: {
    type: Array,
    default: [],
    // [{
    //   id: "shopId",
    //   name: "shop1",
    //   img: "",
    //   color: "#898989",
    // }]
  },
});

const Area = mongoose.model("areas", areaSchema);

export default Area;