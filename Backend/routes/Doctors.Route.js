const express = require("express");
const {
  DoctorModel,
  getAllDoctors,
  docModel,
  createTables,
  findById,
  findIfExists,
  addDoctor,
} = require("../models/Doctor.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const doctors = await DoctorModel.find();
    await createTables();
    const doctors = await getAllDoctors();
    console.log("doctors", doctors);
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  //const { email } = req.body;
  try {
    await createTables();
    const doctor = await findIfExists(req.body.email);
    //const doctor = await DoctorModel.findOne({ email });
    if (doctor.length > 0) {
      return res.send({
        message: "Doctor already exists",
      });
    }
    // let value = new DoctorModel(req.body);
    // await value.save();
    const value = req.body;
    console.log(value);
    await addDoctor(value);
    // const data = await DoctorModel.findOne({ email });
    const data = await findIfExists(req.body.email);
    const email = data[0].email;
    console.log(email);
    return res.send({ email, message: "Registered" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    // const doctor = await DoctorModel.findOne({ docID, password });
    const doctor = await findById(docID);

    if (docID == doctor[0].id && password == doctor[0].password) {
      const token = jwt.sign({ foo: "bar" }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.send({
        message: "Successful",
        user: { ...doctor, userType: "doctor" },
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

router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = req.body;
  try {
    await DoctorModel.findByIdAndUpdate({ _id: id }, payload);
    const doctor = await DoctorModel.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .send({ message: `Doctor with id ${id} not found` });
    }
    res.status(200).send({ message: `Doctor Updated`, user: doctor });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByIdAndDelete({ _id: id });
    if (!doctor) {
      res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send(`Doctor with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
