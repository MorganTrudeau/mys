const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const firestore = admin.firestore();

const bodyParser = require("body-parser");
router.use(bodyParser.json({ limit: "50mb" }));
router.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

router.post("/savePosition", (req, res) => {
  const { position, userId } = req.body;
  return firestore
    .collection("Locations")
    .doc(userId)
    .set({ position, userId })
    .then(() => res.end())
    .catch(error => res.sendStatus(500));
});

module.exports = router;
