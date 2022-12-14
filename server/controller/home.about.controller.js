const HomeAbout = require("../models/home.about");

//--------------------------add new about for the frist

const addAboutData = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const newabout = new HomeAbout({
      title,
      desc,
    });
    await newabout.save();
    res.status(200).send(newabout);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//----------------------------------get all about data

const getAboutData = async (req, res) => {
  try {
    const aboutData = await HomeAbout.find({});
    if (!aboutData) {
      throw Error("there is no packages");
    }
    res.status(200).send(aboutData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
/////-------------------update about data
const updateAboutData = async (req, res) => {
  try {
    await ListItem.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      desc: req.body.desc,
    });
  } catch (err) {
    console.error(err.message);
    res.send(400).send("Server Error");
  }
};

module.exports = { addAboutData, getAboutData, updateAboutData };
