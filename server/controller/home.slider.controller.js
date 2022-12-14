const HomeSlider = require("../models/hoem.slider");

//--------------------------add new about for the frist

const addSlider = async (req, res) => {
  try {
    const { title, desc, imageSrc } = req.body;
    const newaslider = new HomeSlider({
      title,
      desc,
      imageSrc,
    });
    await newaslider.save();
    res.status(200).send(newaslider);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//----------------------------------get all about data

const getSlider = async (req, res) => {
  try {
    const sliderData = await HomeSlider.find({});
    if (!sliderData) {
      throw Error("there is no packages");
    }
    res.status(200).send(sliderData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
/////-------------------update about data
const updateSlider = async (req, res) => {
  try {
    await ListItem.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      desc: req.body.desc,
      imageSrc: req.body.imageSrc,
    });
  } catch (err) {
    console.error(err.message);
    res.send(400).send("Server Error");
  }
};

module.exports = { getSlider, addSlider, updateSlider };
