import mongoose from "mongoose";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

import Router from "./Router.js";

//-----------------------------------------------> using imports
const app = express();
const http = createServer(app);
const io = new Server(http);
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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connection successful at port ${port}`);
});

//-----------------------------------------------> socket.io

// io.on("connection", (socket) => {
//   console.log("socket connected");
// });