const express = require("express");
const {
  addAmbulance,
  createTable,
  findIfExists,
} = require("../models/Ambulance.model");

const router = express.Router();

router.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    await createTable;
    const ambulance = await findIfExists(payload.numPlate);
    if (ambulance.length > 0) {
      return res.send({
        message: "Ambulance already exists",
      });
    }
    console.log("payload", payload);
    await addAmbulance(payload);
    return res.send({ message: "Ambulance Added Successfully" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

module.exports = router;
