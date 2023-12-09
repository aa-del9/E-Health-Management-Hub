const express = require("express");
const {
  add,
  NurseModel,
  getAllPatients,
  createTable,
  patientCredModel,
  findCred,
} = require("../models/Nurse.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await createTable();
    console.log("idhr");
    const patients = await getAllPatients();
    res.status(200).send(patients);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const patient = findById(data.id);
    console.log(patient);
    if (patient) {
      return res.send({
        message: "Patient already exists",
      });
    } else {
      console.log("heree");
      patientCredModel.id = data.id;
      patientCredModel.password = data.password;
      console.log("model", patientCredModel);
      await add(patientCredModel);
      return res.send({ value, message: "Registered" });
    }
    //hi
    // const nurse = await NurseModel.findOne({ email });
    // if (nurse) {
    //   return res.send({
    //     message: "Nurse already exists",
    //   });
    // }
    // let value = new NurseModel(req.body);
    // await value.save();
    // const data = await NurseModel.findOne({ email });
    // return res.send({ data, message: "Registered" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { nurseID, password } = req.body;
  try {
    const patient = await findCred(nurseID);
    //const nurse = await NurseModel.findOne({ nurseID, password });
    //console.log("res", patient.password);
    if (nurseID == patient[0].id && password == patient[0].password) {
      const token = jwt.sign({ foo: "bar" }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.send({
        message: "Successful",
        user: { ...patient, userType: "patient" },
        token: token,
      });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  const payload = req.body;
  try {
    await NurseModel.findByIdAndUpdate({ _id: id }, payload);
    const nurse = await NurseModel.findById(id);
    if (!nurse) {
      return res.status(404).send({ message: `Nurse with id ${id} not found` });
    }
    res.status(200).send({ message: `Nurse Updated`, user: nurse });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  try {
    const nurse = await NurseModel.findByIdAndDelete({ _id: id });
    if (!nurse) {
      res.status(404).send({ msg: `Nurse with id ${id} not found` });
    }
    res.status(200).send(`Nurse with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
