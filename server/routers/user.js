const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  sendCode,
  forgetPassword,
  confirmEmail,
  addProfileAvatar,
  updateProfile,
  refreshEmail,
  deleteUser,
  logoutUser,
  userProfile,
  getUsersData,
  getUserByID,
} = require("../controller/user.controller");
//
const auth = require("../middelware/auth2");
const auth2 = require("../middelware/auth");
const uploads = require("../services/multer.services");

const authController = require("../controller/auth.controller");

//done
router.post("/user/signUp", signUp);
router.post("/user/login", login);
router.post("/user/sendCode", sendCode);
router.get("/user/confirmEmail/:token", confirmEmail);
router.get("/user/refreshEmail/:token", refreshEmail);
router.post("/user/forgetPassword", forgetPassword);
router.get("/user/profile", auth, userProfile);
// router.get("/user/confirmEmail/:token", confirmEmail);
router.post(
  "/profile/avatar",
  auth,
  uploads.single("avatar"),
  addProfileAvatar
);
router.patch("/user/updateProfile", auth, updateProfile);
router.patch("/user/updateProfile", auth, updateProfile);
router.delete("/user/deleteUser", auth, deleteUser);
// get users data
router.get("/user/getallusers", getUsersData);
router.get("/user/getuser/:id", getUserByID);
router.delete("/user/logoutMe", auth, logoutUser);
router.post("/user/authLogin", authController.handleLogin);

module.exports = router;
