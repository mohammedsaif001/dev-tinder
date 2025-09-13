const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middleware/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending Connection Request

  res.send(user.firstName + "sent the connect request!");
});

module.exports = requestRouter;
