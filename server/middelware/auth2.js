const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth2 = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      // res.redirect("/auth/login");

      return res.status(401).send("No Token Founded");
    }
    jwt.verify(token, process.env.logingtoken, async (err, decoded) => {
      if (err) {
        console.log("403 expired");
        return res.status(403).send("You are not logged in");
      }

      const user = await User.findOne({ _id: decoded._id });
      if (!user) res.status(401).send("No user founded");
      req.user = user;
      req.token = token;
      next();
    });
  } catch (e) {
    res.status(401).send("No token founded!");
  }
};

module.exports = auth2;
