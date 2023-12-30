const express = require("express");
const { getPatientMedicine } = require("../models/Prescription.model");

const router = express.Router();

router.post("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  try {
    const medicines = await getPatientMedicine(id);
    console.log("medicines : route data : ", medicines);
    res.status(200).send(medicines);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = router;
