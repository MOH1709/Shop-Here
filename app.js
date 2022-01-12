import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { cleancities, cleanareas, cleanshops } from "./routes/index.js";

//-----------------------------------------------> connect to database
mongoose
  .connect(process.env.LOCAL_DB)
  .then(() => {
    console.log("db connected sucessfully");
  })
  .catch((e) => {
    console.log("error in connecting db");
  });

//-----------------------------------------------> using imports
const app = express();
app.use(express.json()); // to convert all post request into json format

app.use(cleancities);
app.use(cleanareas);
app.use(cleanshops);


//-----------------------------------------------> adding listener
app.listen(process.env.PORT, () => {
  console.log(`connection successful at port ${process.env.PORT}`);
});