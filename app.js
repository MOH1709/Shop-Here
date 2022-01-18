import mongoose from "mongoose";
import express from "express";
import "dotenv/config";

import Router from "./Router.js";

//-----------------------------------------------> using imports
const app = express();
app.use(express.json()); // to convert all post request into json format

//-----------------------------------------------> connect to database
mongoose
  .connect(process.env.LOCAL_DB)
  .then(() => {
    app.use(Router); // using custom routes
    console.log("database connection successful");
  })
  .catch((e) => {
    console.log("error in connecting to database !!\n", e);
  });

//-----------------------------------------------> adding listener
app.listen(process.env.PORT, () => {
  console.log(`connection successful at port ${process.env.PORT}`);
});