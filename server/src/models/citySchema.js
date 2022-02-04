import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  areas: [{
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
  }, ],
  providers: [{
    name: {
      type: String,
    },
    work: {
      type: String,
    },
    address: {
      type: String,
    },
  }, ],
});

const City = mongoose.model("cities", citySchema);

export default City;