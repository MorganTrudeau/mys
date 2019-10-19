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

router.post("/create", (req, res) => {
  const { transport } = req.body;
  return firestore
    .collection(`Transports`)
    .doc(transport.id)
    .set(transport)
    .then(() => res.sendStatus(200))
    .catch(error => res.status(500).send(error));
});

module.exports = router;
