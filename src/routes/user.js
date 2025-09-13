const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Fetch all the pending connection request for logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); // Getting data from another table which is used as ref in the schema
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

// Fetching all My Connections Feed
userRouter.get("/user/connections", userAuth, async (rer, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId; // If I've sent the request and oppponent has accepted it then give the other data
      }
      return row.fromUserId; // If I've Recieved the request then fetch the sender data
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
