import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  areas: {
    type: Array,
  },
  providers: {
    type: Array,
  },
});

const City = mongoose.model("cities", citySchema);

export default City;