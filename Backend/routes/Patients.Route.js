const express = require("express");
const {
  addPatient,
  getAllPatients,
  createTable,
  findCred,
  findIfExists,
  updatePass,
} = require("../models/Patient.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await createTable();
    const patients = await getAllPatients();
    res.status(200).send(patients);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    await addPatient(req.body);
    return res.send({
      message: "Registered",
    });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { ID, password } = req.body;
  try {
    const patient = await findCred(ID);
    if (ID == patient[0].id && password == patient[0].password) {
      const token = jwt.sign({ foo: "bar" }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.send({
        message: "Successful",
        user: { ...patient[0], userType: "patient" },
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

router.post("/check", async (req, res) => {
  try {
    const patient = await findIfExists(req.body.email);
    console.log(patient);
    if (patient.length > 0) {
      return res.send({
        message: "Patient already exists",
      });
    } else {
      return res.send({
        message: "Patient does not exist",
      });
    }
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const password = req.body.password;
  try {
    await updatePass(password, id);
    const patient = await findCred(id);
    if (patient[0].password === password) {
      return res.status(200).send({
        message: "password updated",
        user: { ...patient[0], userType: "patient" },
      });
    } else {
      return res.status(404).send({ message: `password not updated` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Serror" });
  }
});

module.exports = router;
