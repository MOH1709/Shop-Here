import bcrypt from "bcryptjs";
import { Router } from "express";
import { User, Issue } from "../models/index.js";

const router = Router();

//-----------------------------------------------> geting user data
router.get("/:ujwt", async(req, res) => {
  try {
    const { ujwt } = req.params;
    const user = await User.findOne({ tokens: { $in: ujwt } }, { _id: 0, tokens: 0, orders: 0 });

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("error in getting user data");
  }
});

//-----------------------------------------------> check if such user exist
router.get("/isUserExist/:userId", async(req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId }, { _id: 1 });

    res.status(200).send({ isUserExist: !!user });
  } catch (e) {
    res.status(500).send("error in getting user data");
  }
});

//-----------------------------------------------> get orders of users
router.get("/orders/:ujwt", async(req, res) => {
  try {
    const { ujwt } = req.params;

    const { orders } = await User.findOne({ tokens: { $in: ujwt } }, { _id: 0, orders: 1 });

    res.status(200).send(orders);
  } catch (e) {
    res.status(400).send("error in getting orders");
  }
});

//-----------------------------------------------> login in user
router.put("/login", async(req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = await user.generateAuthToken();
      const expireTime = 108000000; // 30 days in milliseconds
      res.cookie("ux", token, { maxAge: expireTime });
      res.cookie("ci", user.cityId, { maxAge: expireTime });
      res.cookie("un", user.name, { maxAge: expireTime });
      res.cookie("fa", user.address, { maxAge: expireTime });
      user.bussinessId &&
        res.cookie("bx", user.bussinessId, { maxAge: expireTime });

      return res.status(200).send("logging in successfull");
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    res.status(400).send("error in logging in");
  }
});

//-----------------------------------------------> update user details
router.put("/:ujwt", async(req, res) => {
  try {
    const { state } = req.body;
    const { ujwt } = req.params;
    const user = await User.findOne({ tokens: { $in: ujwt } });

    if (state.password) {
      state.password = await bcrypt.hash(state.password, 12);
    }

    await User.updateOne({ _id: user._id }, {
      $set: state,
    });

    res.status(200).send("user updated");
  } catch (e) {
    res.status(400).send("error in updating user details");
  }
});

//----------------------------------------------->
router.put("/changePass/:userId", async(req, res) => {
  try {
    const { state } = req.body;
    const { userId } = req.params;

    await User.updateOne({ userId }, {
      $set: {
        ...state,
        password: await bcrypt.hash(state.password.toString(), 12),
      },
    });

    res.status(200).send("user updated");
  } catch (e) {
    res.status(400).send("error in updating user details");
  }
});

//-----------------------------------------------> add new user
router.post("/signin", async(req, res) => {
  try {
    const { name, phoneNumber, address, password, userId, cid } = req.body;

    const isExist = await User.findOne({ userId }, { _id: 1 });

    if (isExist) {
      return res.status(400).send("Invalid credentials for adding users");
    }

    const user = new User({
      userId,
      name,
      password,
      phoneNumber,
      cityId: cid,
      address,
    });
    // info: schema.pre is used to deal with password hashing
    //   before save in userSchema module
    await user.save();

    const token = await user.generateAuthToken();
    const expireTime = 108000000; // 30 days in milliseconds

    res.cookie("ux", token, { maxAge: expireTime });

    res.status(200).send("user added successfully");
  } catch (e) {
    res.status(400).send("error signing in");
  }
});

//-----------------------------------------------> delete token
router.delete("/logout/:ujwt", async(req, res) => {
  try {
    const { ujwt } = req.params;
    const user = await User.updateOne({ tokens: { $in: ujwt } }, {
      $pull: {
        tokens: ujwt,
      },
    });

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("error in loging out");
  }
});

//-----------------------------------------------> report issue
router.post("/issue/:ux", async(req, res) => {
  try {
    const { ux } = req.params;
    const { message } = req.body;

    const issue = new Issue({ ux, message });
    await issue.save();

    res.status(200).send("reported sucessfully");
  } catch (e) {
    res.status(400).send("error in sending issue");
  }
});

export default router;