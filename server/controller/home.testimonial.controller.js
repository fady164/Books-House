const HomeTestimonial = require("../models/home.testimonial");

//--------------------------add new about for the frist

const addTestimonialData = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const newtestimonial = new HomeTestimonial({
      title,
      desc,
    });
    await newtestimonial.save();
    res.status(200).send(newtestimonial);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//----------------------------------get all about data

const getTestimonialData = async (req, res) => {
  try {
    const testimonial = await HomeTestimonial.find({});
    if (!testimonial) {
      throw Error("there is no packages");
    }
    res.status(200).send(testimonial);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
/////-------------------update about data
const updatetestimonialData = async (req, res) => {
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

module.exports = {
  addTestimonialData,
  getTestimonialData,
  updatetestimonialData,
};
