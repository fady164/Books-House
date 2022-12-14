const Package = require("../models/package");

//--------------------------add new package

const addPackageData = async (req, res) => {
   try {
      //دي الداتا اللي المفروض نوصلها يا نورهان
      //const {packName,packPrice,packNumber,packTitle,packSubTitle,packDesc}=req.body
      const { packageName, packageDesc, packagePrice, reviewsNumber } =
         req.body;
      const newPackage = new Package({
         packageName,
         packageDesc,
         packagePrice,
         reviewsNumber,
      });
      await newPackage.save();
      res.status(200).send(newPackage);
   } catch (e) {
      res.status(500).send(e.message);
   }
};

//----------------------------get package by ID
const getPackageByID = async (req, res) => {
   try {
      const package = await Package.findOne({ _id: req.params.id });

      if (!package) {
         return res.send(404).send("Cannot find Package !");
      }
      res.status(200).send(package);
   } catch (e) {
      res.status(400).send(e.message);
   }
};

//----------------------------------get all packages data

const getAllPackages = async (req, res) => {
   try {
      const packages = await Package.find({});
      if (!packages) {
         throw Error("there is no packages");
      }
      res.status(200).send(packages);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

//----------------------------------delete all packages

const deleteAllPackages = async (req, res) => {
   try {
      await Package.deleteMany({});

      res.status(200).send("deleted sucessfuly");
   } catch (e) {
      res.status(500).send(e.message);
   }
};
///
const updatePackageById = async (req, res) => {
   try {
      const _id = req.params.id;
      const package = await Package.findByIdAndUpdate({ _id }, req.body, {
         new: true,
         runvalidators: true,
      });
      if (!package) {
         return res.status(404).send("no Package have this id");
      }
      res.status(200).send(package);
   } catch (e) {
      res.status(500).send(e.message);
   }
};

module.exports = {
   addPackageData,
   getPackageByID,
   getAllPackages,
   deleteAllPackages,
   updatePackageById,
};
