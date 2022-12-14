const Home = require("../models/home");

//--------------------------add new home data

const addHomeData = async (req, res) => {
  try {
    const homedata = new Home(req.body);
    await homedata.save();
    res.status(200).send({ homedata });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//----------------------------------get home data

const getHomeData = async (req, res) => {
  try {
    const homedata = await Home.find({});
    if (!homedata) {
      throw Error("there is no data");
    }
    res.status(200).send(homedata);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//------------------------------update Home data

const updateHomeData = async (req, res) => {};

module.exports = { addHomeData, getHomeData, updateHomeData };
