import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import fileupload from "express-fileupload";
// import { createServer } from "http";
// import { Server } from "socket.io";

//-----------------------------------------------> custom components
// import Router from "./Router.js";
import {
  city,
  area,
  user,
  order,
  bussiness,
  product,
  extras,
} from "./routes/index.js";

//-----------------------------------------------> testing socket.io
// const http = createServer(app);
// const io = new Server(http);

// io.on("connection", (socket) => {
//   console.log("socket connected");
// });

//-----------------------------------------------> using imports
const app = express();
app.use(express.json()); // to convert all post request into json format
app.use(fileupload()); // to upload files i.e. images

//-----------------------------------------------> using routes
app.use(extras);
app.use("/cities", city);
app.use("/area", area);
app.use("/bussiness", bussiness);
app.use("/user", user);
app.use("/order", order);
app.use("/product", product);

//-----------------------------------------------> connect to database
mongoose
  .connect(process.env.LOCAL_DB)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((e) => {
    console.log("error in connecting to database !!\n", e);
  });

//-----------------------------------------------> adding listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connection successful at port ${port}`);
});