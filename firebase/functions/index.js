const functions = require("firebase-functions");
const express = require("express");
const app = express();

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://move-your-shit.firebaseio.com"
});

const stripeRoute = require("./routes/stripe");
app.use("/stripe", stripeRoute);

const locationRoute = require("./routes/location");
app.use("/location", locationRoute);

const transportRoute = require("./routes/transport");
app.use("/transport", transportRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

exports.app = functions.https.onRequest(app);
