const { Stripe } = require("../models/stripe");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY)
const getConfig = (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

const createPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: req.body.packagePrice * 100,
      payment_method_types: ["card"],
    });

    console.log(req.body);
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

const postData = async (req, res) => {
  const package = JSON.stringify(req.body[0].packages);
  const author = JSON.stringify(req.body[1].authorData);
  const customer = await stripe.customers.create({
    metadata: {
      packages: package,
      authorData: author,
    },
  });
  // console.log(req.body);
  // console.log(customer.metadata.packages)
  res.send("data recived with sucess");
};
const createOrder = async (customer) => {
  let packages = "";
  let authorDatai = "";
  if (customer.metadata.packages) {
    packages = JSON.parse(customer.metadata.packages);
    authorDatai = JSON.parse(customer.metadata.authorData);
    // console.log("in", packages);
    // console.log("in", authorDatai);
  }
  if (packages) {
    const newStripe = new Stripe({
      package: {
        id: packages._id,
        name: packages.packageName,
        price: packages.packagePrice,
      },
      authorData: {
        firstName: authorDatai.firstName,
        lastName: authorDatai.lastName,
        authorEmail: authorDatai.authorEmail,
        phoneNumber: authorDatai.phoneNumber,
        bookDocType: authorDatai.bookDocType,
        booksnumber: authorDatai.booksnumber,
        comment: authorDatai.comment,
      },
    });

    try {
      const savedOrder = await newStripe.save();
      console.log("Processed Order:", savedOrder);
    } catch (err) {
      console.log(err);
    }
  }
};

const postWebHookPackages = async (req, res) => {
  console.log("insied web hook");
  // console.log("req Hooooooooooook",req.body.type);
  let customer = req.body.data.object;
  // let event = req.body;
  // console.log("hook", customer, "*", event);

  console.log("event///// type", req.body.type);
  if (req.body.type === "payment_intent.succeeded") {
    try {
      console.log("here");
      await createOrder(customer);
    } catch (err) {
      console.log(typeof createOrder);
      console.log(err);
    }
  }
  if (req.body.type === "charge.succeeded") {
    console.log("from Else************************");
    try {
      await createOrder(customer);
    } catch (err) {
      console.log(typeof createOrder);
      console.log(err);
    }
  } else {
    try {
      await createOrder(customer);
    } catch (err) {
      console.log(typeof createOrder);
      console.log(err);
    }
  }

  res.json({ sucess: true });
};

module.exports = { getConfig, createPayment, postData, postWebHookPackages };
