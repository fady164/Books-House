const { Order } = require("../models/order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//--------------------------add new  reader

const postStripeCart = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      cart: JSON.stringify(req.body.data),
    },
  });

  const line_items = req.body.data.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.imageSource],
          description: "Book Description",
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  //   const line_items = [
  //     {
  //       price_data: {
  //         currency: "usd",
  //         product_data: {
  //           name: "T-shirt",
  //         },
  //         unit_amount: 2000,
  //       },
  //       quantity: 1,
  //     },
  //     {
  //       price_data: {
  //         currency: "usd",
  //         product_data: {
  //           name: "T-shirt",
  //         },
  //         unit_amount: 2000,
  //       },
  //       quantity: 1,
  //     },
  //   ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE", "EG"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `http://localhost:3000/completion`,
    cancel_url: `http://localhost:3000/cart`,
  });

  res.send({ url: session.url });
};

const createOrder = async (customer, data) => {
  // console.log("order", customer.metadata.cart);
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item.id,
      imageSource: item.imageSource,
      title: item.title,
      quantity: item.cartQuantity,
    };
  });

  const newOrder = new Order({
    customerEmail: customer.email,
    customerPhone: customer.phone,
    customerId: data.customer,
    paymentIntentId: data.id,
    products,
    subtotal: data.amount / 100,
    total: data.amount_received / 100,
    shipping: data.shipping,
    payment_status: data.status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

const postWebHook = async (req, res) => {
  console.log("insied web hook cart");

  let data;
  let eventType;
  try {
    data = req.body.data.object;
    eventType = req.body.type;

    if (eventType === "payment_intent.succeeded") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            console.log("customer", customer, "data", data);
            createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    // console.log(req.body);
    // await  createOrder(customer, data);
  } catch (err) {
    console.log(typeof createOrder);
    console.log(err);
  }

  res.json({ sucess: true });
};

module.exports = { postStripeCart, postWebHook };
