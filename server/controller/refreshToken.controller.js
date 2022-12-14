const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const handleRefreshToken = async (req, res) => {
  // var incoming_cookies = cookieHeader.parse(req.headers.cookie);
  const reqCookie = req.cookies["refreshTokenVal"];
  console.log(req.cookies["refreshTokenVal"]);

  //check if cookie exist
  if (!reqCookie) return res.status(401).send("no reqCookie");
  const refreshToken = reqCookie;

  res.clearCookie("refreshTokenVal", {
    secure: true,
    httpOnly: true,
    sameSite: "None",
  });
  res.clearCookie("logged_in", {
    httpOnly: false,
    secure: true,
    sameSite: "None",
  });
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.status(404).send("no found user");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [""];
        console.log("403 expired");
        return res.status(403).send("expierd");
      }

      const newrefreshTokenn = jwt.sign(
        { _id: foundUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      const token = jwt.sign(
        { _id: foundUser._id, isLogged: true },
        process.env.logingtoken,
        { expiresIn: "3h" }
      );

      (async () => {
        console.log("ya function");
        foundUser.refreshToken = [newrefreshTokenn];
        const result = await foundUser.save();
        console.log("new user", result);
      })();

      res.cookie("refreshTokenVal", newrefreshTokenn, {
        httpOnly: true,
        sameSite: "None",
        secure: true,

        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("logged_in", true, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "refreshed suceess",
        token,
        user: foundUser,
        allowedRole: "user",
      });
    }
  );

  ;
};

module.exports = { handleRefreshToken };
