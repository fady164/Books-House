const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controller/refreshToken.controller");
const refreshTokenAdmin = require("../controller/refreshTokenAdmin");

router.get("/user/refreshMe", refreshTokenController.handleRefreshToken);
router.get("/admin/refreshMe", refreshTokenAdmin.handleRefreshToken);

module.exports = router;
