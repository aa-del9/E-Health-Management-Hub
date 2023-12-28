const express = require("express");
const {
  PrescriptionModel,
  getPatientMedicine,
} = require("../models/Prescription.model");

const router = express.Router();

router.post("/:patientId", async (req, res) => {
  //router.post
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

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const prescription = new PrescriptionModel(payload);
    await prescription.save();
  } catch (error) {
    res.send("Error occurred, unable to create a prescription.");
    console.log(error);
  }
  res.send("Prescription successfully created.");
});

router.patch("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId;
  const payload = req.body;
  try {
    const prescription = await PrescriptionModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!prescription) {
      res.status(404).send({ msg: `Prescription with id ${id} not found` });
    }
    res.status(200).send(`Prescription with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId;
  try {
    const prescription = await PrescriptionModel.findByIdAndDelete({ _id: id });
    if (!prescription) {
      res.status(404).send({ msg: `Prescription with id ${id} not found` });
    }
    res.status(200).send(`Prescription with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
