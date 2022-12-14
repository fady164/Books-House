const jwt = require("jsonwebtoken");
const User = require("../models/admin");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/email.service");

require("dotenv").config();

//-------------------------------------login

/////////////////////////////////////////////

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.status(404).json({ message: "Invalid Email Account" });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(500).send("Not Match !");
    } else {
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "12h" }
      );
      const token = jwt.sign(
        { _id: user._id, isLogged: true },
        process.env.logingtoken,
        { expiresIn: "1h" }
      );

      (async () => {
        user.refreshToken = [refreshToken];
        await user.save();
      })();

      res.cookie("refreshTokenVal", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login suceess",
        token,
        user,
        allowedRole: "admin",
      });
    }
  }
};

// Confirm email**************************************

const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.emailToken);

    if (!decoded) {
      res.status(400).json({ message: "Invalid token" });
    } else {
      const user = await User.findById(decoded._id);

      if (!user) {
        res.status(404).json({ message: "Invalid token id" });
      } else {
        if (user.confirmed) {
          res.status(400).json({ message: "You already Confirmed " });
        } else {
          await User.findOneAndUpdate({ _id: user.id }, { confirmed: true });

          res.status(200).json({ message: " Done Please Login" });
        }
      }
    }
  } catch (e) {
    res.status(500).json({ message: "Confirmation Failed" });
  }
};

// refresh email*************************************

const refreshEmail = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ id }).select("confirmEmail email");

  if (!user) {
    res.status(404).json({ message: "Invalid Account" });
  } else {
    if (user.confirmEmail) {
      res.status(400).json({ message: "Already Confirmed" });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.emailToken, {
        expiresIn: 5 * 60,
      });

      const link = `${req.protocol}://${process.env.host}/admin/confirmEmail/${token}  `;
      const link2 = `${req.protocol}://${req.headers.host}/admin/refreshEmail/${user._id}  `;
      const message = `<a href=${link}>plz confirm your email </a> <br> <a href=${link2}>resend confirmintion email </a>`;

      sendEmail(user.email, message);
      await User.findByIdAndUpdate({ _id: user.id });

      res.status(400).json({ message: "Done Check Your Email" });
    }
  }
};

//-----------------------------------------------------sending code

const sendCode = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "In-valid Email" });
  } else {
    const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 100000);
    const title = `<h3>Security code</h3>`;
    const message = `${title}</br>Please use the following security code for Your account </br>
                     Security code: <b>${code}</b></br>
                     </br></br>
                     Thanks,</br>The Books-House team`;

    await User.findByIdAndUpdate({ _id: user._id }, { code });
    sendEmail(email, message);

    res.status(200).json({ message: "Valid Email check your Inbox", code });
  }
};

//forget password
const forgetPassword = async (req, res) => {
  const { email, newpassword, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "In-valid Email" });
  } else {
    if (user.code != code) {
      res.status(404).json({ message: "Invalid Code" });
    } else {
      const hashPassword = await bcrypt.hash(
        newpassword,
        parseInt(process.env.saltRounds)
      );

      await User.findByIdAndUpdate(
        { _id: user._id },
        { password: hashPassword, code: " " }
      );
      res.json({ message: "Password Changed Successfuly" });
    }
  }
};

//logout Admin ***********************

const logoutAdmin = async (req, res) => {
  const reqCookie = req.cookies["refreshTokenVal"];

  if (!reqCookie) return res.status(204);

  const refreshToken = reqCookie;

  // If refresher token exist in database
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("refreshTokenVal", {
      httpOnly: true,
      secure: true,

      sameSite: "None",
    });
    res.clearCookie("logged_in", {
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });
    return res.status(204);
  }

  // Delete refresher in database
  foundUser.refreshToken = [];
  const result = await foundUser.save();
  res.clearCookie("logged_in", {
    httpOnly: false,
    secure: true,
    sameSite: "None",
  });
  res.clearCookie("refreshTokenVal", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(204).send("You Loged Out All Tokens");
};

//check admin tonken by get admin data
const adminProfile = async (req, res) => {
  res.status(200).send({ m:'success', allowedRole: "admin" });
};
module.exports = {
  confirmEmail,
  refreshEmail,
  login,
  sendCode,
  forgetPassword,
  logoutAdmin,
  adminProfile
};
