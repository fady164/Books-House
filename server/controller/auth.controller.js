const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  // console.log(`cookie available ar login: ${JSON.stringify(cookies)}`);aaa
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(401).json({ message: "Invalid account data!" });
  }
  const match = await bcryptjs.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ _id: user._id }, process.env.logingtoken, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt !== cookies.jwt);
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log("attempted refresh token reuse at login!");
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }
    // refreshTokens.push(refreshToken);
    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await user.save();

    console.log(result);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ token });
  } else {
    res.sendStatus(400); ///error for auth login********************************
  }
};

module.exports = { handleLogin };

//  const { user, pwd } = req.body;
//  if (!user || !pwd)
//    return res
//      .status(400)
//      .json({ message: "Username and password are required." });

//  const foundUser = await User.findOne({ username: user }).exec();
//  if (!foundUser) return res.status(401); //Unauthorized
//  // evaluate password
//  const match = await bcryptjs.compare(pwd, foundUser.password);
//  if (match) {
//    const roles = Object.values(foundUser.roles).filter(Boolean);
//    // create JWTs
//    const accessToken = jwt.sign(
//      {
//        UserInfo: {
//          username: foundUser.username,
//          roles: roles,
//        },
//      },
//      process.env.ACCESS_TOKEN_SECRET,
//      { expiresIn: "10s" }
//    );
//    const newRefreshToken = jwt.sign(
//      { username: foundUser.username },
//      process.env.REFRESH_TOKEN_SECRET,
//      { expiresIn: "1d" }
//    );

//    // Changed to let keyword
//    let newRefreshTokenArray = !cookies?.jwt
//      ? foundUser.refreshToken
//      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

//    if (cookies?.jwt) {
//      /*
//             Scenario added here:
//                 1) User logs in but never uses RT and does not logout
//                 2) RT is stolen
//                 3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
//             */
//      const refreshToken = cookies.jwt;
//      const foundToken = await User.findOne({ refreshToken }).exec();

//      // Detected refresh token reuse!
//      if (!foundToken) {
//        console.log("attempted refresh token reuse at login!");
//        // clear out ALL previous refresh tokens
//        newRefreshTokenArray = [];
//      }

//      res.clearCookie("jwt", {
//        httpOnly: true,
//        sameSite: "None",
//        secure: true,
//      });
//    }

//    // Saving refreshToken with current user
//    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//    const result = await foundUser.save();
//    console.log(result);
//    console.log(roles);

//    // Creates Secure Cookie with refresh token
//    res.cookie("jwt", newRefreshToken, {
//      httpOnly: true,
//      secure: true,
//      sameSite: "None",
//      maxAge: 24 * 60 * 60 * 1000,
//    });

//    // Send authorization roles and access token to user
//    res.json({ roles, accessToken });
//  } else {
//    res.status(401);
//  }
