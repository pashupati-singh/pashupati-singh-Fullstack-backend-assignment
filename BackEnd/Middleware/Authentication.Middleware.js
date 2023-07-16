const { blacklist } = require("../db/BlackList");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (blacklist.includes(token)) {
    return res.status(200).json({ msg: "Need to login again" });
  }
  try {
    jwt.verify(token, "helloworld", (err, decoded) => {
      if (err) {
        return res.status(200).json({ msg: "unAuthorized" });
      } else if (decoded) {
        (req.body.userId = decoded.userID),
          (req.body.userName = decoded.userName),
          next();
      }
    });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

module.exports = { auth };
