const express = require("express");
const router = express.Router();
const {
   addPackageData,
   getAllPackages,
   deleteAllPackages,
   getPackageByID,
   updatePackageById,
} = require("../controller/package.controller");
const auth = require("../middelware/auth");

router.post("/newpackage", addPackageData);
router.put("/package/update/:id", updatePackageById);
// router.get('/package/getall',auth,getAllPackages)
router.get("/package/getall", getAllPackages);
// router.get('/package/:id',auth,getPackageByID)
router.get("/package/:id", getPackageByID);

// router.delete('/package/removeAll',auth,deleteAllPackages)
router.delete("/package/removeAll", deleteAllPackages);

module.exports = router;
