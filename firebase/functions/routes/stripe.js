// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const firestore = admin.firestore();
const stripe = require("stripe")("sk_test_CSO5sCU4TsvQSFlOpspnShi5003S4QpoBN");

const bodyParser = require("body-parser");
router.use(bodyParser.json({ limit: "50mb" }));
router.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

router.get("/balance", (req, res) => {});

router.post("/create_customer", (req, res) => {
  const { params, userId } = req.body;

  return stripe.customers.create(params, async (error, customer) => {
    if (error) {
      console.log("Error", error);
      res.status(400).send(error);
    } else {
      console.log("Customer", customer);
      await firestore
        .collection("Users")
        .doc(userId)
        .set({ customerId: customer.id }, { merge: true });
      res.send(customer);
    }
  });
});

router.post("/update_customer", (req, res) => {
  const { updates, customerId } = req.body;
  return stripe.customers.update(customerId, updates, (error, customer) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      console.log("Customer", customer);
      res.send(customer);
    }
  });
});

router.get("/get_customer", (req, res) => {
  const { customerId } = req.query;
  return stripe.customers.retrieve(customerId, (error, customer) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      console.log("Customer", customer);
      res.send(customer);
    }
  });
});

router.post("/add_source", (req, res) => {
  const { source, customerId } = req.body;
  return stripe.customers.createSource(
    customerId,
    {
      source
    },
    (error, card) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.send(card);
      }
    }
  );
});

router.get("/delete_source", (req, res) => {
  const { customerId, source } = req.query;
  return stripe.customers.deleteSource(
    customerId,
    source,
    (error, confirmation) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.send(confirmation);
      }
    }
  );
});

router.get("/list_sources", (req, res) => {
  const { customerId } = req.query;

  return stripe.customers.listSources(
    customerId,
    {
      object: "card"
    },
    (error, cards) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.send(cards);
      }
    }
  );
});

router.post("/create_charge", (req, res) => {
  const { amount, source, customer, currency } = req.body;
  return stripe.charges.create(
    {
      amount,
      currency,
      source,
      customer
    },
    (error, charge) => {
      if (error) {
        console.log(error);
        res.status(400).send(error);
      } else {
        console.log(charge);
        res.send(charge);
      }
    }
  );
});

router.post("/charge", async (req, res) => {
  const { amount, customerId } = req.body;
  console.log("Amount", amount);
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: "usd",
    customer: customerId
  });
  console.log("Charge", charge);
  res.json(charge);
});

module.exports = router;
