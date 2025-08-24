const userMiddleWare = (req, res, next) => {
  const { location } = req.body;
  console.log(location);
  if (location === "Bangalore") {
    next();
  } else {
    res.status(500).send("Not Eligible in Your Current Region");
  }
};

module.exports = userMiddleWare;
