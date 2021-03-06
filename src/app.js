import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import fileupload from "express-fileupload";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

//-----------------------------------------------> custom
import * as router from "./routes/index.js";

//-----------------------------------------------> using dirname
const __dirname = dirname(fileURLToPath(
  import.meta.url));

//-----------------------------------------------> using imports
const app = express();
app.use(cors());
app.use(express.json()); // to convert all post request into json format
app.use(fileupload()); // to upload files i.e. images

//-----------------------------------------------> using routes
app.use("/utils", router.utils);
app.use("/otp", router.otp);
app.use("/cities", router.city);
app.use("/area", router.area);
app.use("/bussiness", router.bussiness);
app.use("/user", router.user);
app.use("/order", router.order);
app.use("/product", router.product);

//-----------------------------------------------> connect to database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((e) => {
    console.log("error in connecting to database !!\n");
  });

//-----------------------------------------------> check for heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

//-----------------------------------------------> adding listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connection successful at port ${port}`);
});