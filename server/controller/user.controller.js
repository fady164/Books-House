const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/email.service");

require("dotenv").config();

// --------------------------------------------------------signUp

const signUp = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    const token = jwt.sign({ _id: savedUser._id }, process.env.emailToken, {
      expiresIn: "1h",
    });
    const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`;
    const link2 = `${req.protocol}://${req.headers.host}/user/refreshEmail/${savedUser._id}`;
    const message = `Hi ${newUser.email}, </br>We received Your request for 
                     Email Confermation to use Your Account 
                     Click The Following link :</br><a href=${link}> confirm your email </a><br>
                     <br>If you did not confirm your email within an hour, click on the following 
                     link to send you another email : </br></b>
                    <a href=${link2}> resend confirmation email </a>
                     </br>if you didn't confirmation request, You can safely 
                     Ignore this Email, Someone else might have typed your email address by mistake,</br></br>
                     Thanks,</br>The Books-House Team`;
    sendEmail(savedUser.email, message);
    res
      .status(201)
      .json({ message: "please check your email to verify it", savedUser });
  } catch (e) {
    if (e.keyValue?.email) {
      res.status(409).json({ message: "email exists" });
    } else {
      res.status(500).json({ message: "Error", e });
    }
  }
};

//-------------------------------------login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.status(404).json({ message: "invalid email account" });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(500).send("not match");
    } else {
      console.log("hello iam match");
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "3d" }
      );
      const token = jwt.sign(
        { _id: user._id, isLogged: true },
        process.env.logingtoken,
        { expiresIn: "3h" }
      );

      (async () => {
        console.log("ya function");
        user.refreshToken = [refreshToken];
        await user.save();
      })();

      res.cookie("refreshTokenVal", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("logged_in", true, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "login suceess",
        token,
        user,
        allowedRole: "user",
      });
    }
  }
};

// --------------------------------------------------------EmailConfirm

const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.emailToken);

    if (!decoded) {
      res.status(400).json({ message: "invalid token" });
    } else {
      const user = await User.findById(decoded._id);

      if (!user) {
        res.status(404).json({ message: "invalid token id" });
      } else {
        if (user.confirmed) {
          res.status(400).json({ message: "you already confirmed " });
        } else {
          await User.findOneAndUpdate({ _id: user.id }, { confirmed: true });

          res.status(200).json({ message: " Done plz login" });
        }
      }
    }
  } catch (e) {
    res.status(500).json({ message: " error confirmed", e });
  }
};

// --------------------------------------------refresh email

const refreshEmail = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ id }).select("confirmEmail email");

  if (!user) {
    res.status(404).json({ message: "Invalid account" });
  } else {
    if (user.confirmEmail) {
      res.status(400).json({ message: "Already confirmed" });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.emailToken, {
        expiresIn: 5 * 60,
      });

      const link = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}  `;
      const link2 = `${req.protocol}://${req.headers.host}/user/refreshEmail/${user._id}  `;
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
      res.status(404).json({ message: "In-valid email" });
   } else {
      const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 100000);
      const title=`<h3>Security code</h3>`
      const message = `${title}</br>Please use the following security code for Your account </br>
                       Security code: <b>${code}</b></br>
                       </br></br>
                       Thanks,</br>The Books-House team`;

    await User.findByIdAndUpdate({ _id: user._id }, { code });
    sendEmail(email, message);

      res.status(200).json({ message: "Valid Email check your Inbox ", code });
   }
};

//---------------------------------------------------------forget password
const forgetPassword = async (req, res) => {
  const { email, newpassword, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "In-valid email" });
  } else {
    if (user.code != code) {
      res.status(404).json({ message: "Invalid code" });
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

// --------------------------------------------------------------------Update profile
const updateProfile = async (req, res) => {
  const { email, newpassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "In-valid email" });
  } else {
    const hashPassword = await bcrypt.hash(
      newpassword,
      parseInt(process.env.saltRounds)
    );
    const match = await bcrypt.compare(hashPassword, user.password);
    if (!match) {
      const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

      await userModel.findByIdAndUpdate(
        { _id: user._id },
        { email, password: hashPassword }
      );

      sendEmail(
        user.email,
        `<P>use this code to update u passowrd ${code} </p>`
      );
      res.status(200).json({ message: "Profile Updated Successfuly", code });
    } else {
      res.status(404).json({ message: "Sorry Same Password" });
    }
  }
};

const getMeHandler = (req, res, next) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

//---------------------------------------------------------user avatar

const addProfileAvatar = async (req, res) => {
  try {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.status(200).send("Image Uploaded");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//---------------------- delete user

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  await User.findOneAndDelete({ _id: _id }, { new: true });

  res.json({ message: "User Deleted Successfuly" });
};

//user logout*************************************
const logoutUser = async (req, res) => {
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

//get all users***********************************
const getUsersData = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw Error("there is no users");
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//get data of user*********************************
const getUserByID = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("Cannot Find User !");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const userProfile = async (req, res) => {
  res.status(200).send({ user: req.user, allowedRole: "user" });
};
module.exports = {
  confirmEmail,
  refreshEmail,
  login,
  sendCode,
  forgetPassword,
  signUp,
  updateProfile,
  addProfileAvatar,
  deleteUser,
  logoutUser,
  getMeHandler,
  getUsersData,
  getUserByID,
  userProfile,
};
