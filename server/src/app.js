import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import fileupload from "express-fileupload";
// import { createServer } from "http";
// import { Server } from "socket.io";

//-----------------------------------------------> custom
import * as router from "./routes/index.js";

//-----------------------------------------------> using imports
const app = express();
app.use(express.json()); // to convert all post request into json format
app.use(cors());
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
  .connect(process.env.MONGO_LOCAL)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((e) => {
    console.log("error in connecting to database !!\n");
  });

//-----------------------------------------------> adding listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connection successful at port ${port}`);
});

//-----------------------------------------------> testing socket.io
// const http = createServer(app);
// const io = new Server(http, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("socket connected");
//   socket.on("order", (data) => {
//     socket.join(data);
//   });

//   // data = {room: "to", name: "username", message: ""}
//   socket.on("send_msg", (data) => {
//     socket.to(data.room).emit("recieve_msg", data);
//   });
// });