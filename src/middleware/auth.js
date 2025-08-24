const authMiddleWare = (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  if (name === "saif") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authMiddleWare;
