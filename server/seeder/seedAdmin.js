const Admin = require("../models/admin");
const mongoose = require("mongoose");
// const dev = require("../config/dev"); //get your mongoose string
//create your array. i inserted only 1 object here
const admins = [   
  new Admin({
    email: "nawara28699@gmail.com",
    password: "Nawara$12345"
  }),
  new Admin({
    email: "noor582273@gmail.com",
    password: "Nawara$12345"
  }),
]
//connect mongoose
db='mongodb+srv://ititeam1:ititeam1@cluster0.gw6m8ls.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(String(db), { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
admins.map(async (a, index) => {
  await a.save((err, result) => {
    if (index === admins.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});