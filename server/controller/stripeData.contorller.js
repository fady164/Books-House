const { Order } = require("../models/order");
const { Stripe } = require("../models/stripe");

//----------------------------------get all stripes data packages

const getStripe = async (req, res) => {
   try {
      const stripe = await Stripe.find({});
      if (!stripe) {
         throw Error("there is no stripe");
      }
      res.status(200).send(stripe);
   } catch (error) {
      res.status(500).send(error.message);
   }
};
const getStripeByEmail = async (req, res) => {
   try {
      const stripe = await Stripe.find({ authorEmail: req.params.email });
      if (!stripe) {
         throw Error("there is no stripe");
      }
      res.status(200).send(stripe);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

//----------------------------------get all stripes orders
const getStripeOrdersByEmail = async (req, res) => {
   try {
      const order = await Order.find({ customerEmail: req.params.email });
      if (!order) {
         throw Error("there is no order ");
      }
      res.status(200).send(order);
   } catch (error) {
      res.status(500).send(error.message);
   }
};
const getStripeOrders = async (req, res) => {
   try {
      const order = await Order.find({});
      if (!order) {
         throw Error("there is no order ");
      }
      res.status(200).send(order);
   } catch (error) {
      res.status(500).send(error.message);
   }
};
module.exports = {
   getStripe,
   getStripeByEmail,
   getStripeOrders,
   getStripeOrdersByEmail,
};
