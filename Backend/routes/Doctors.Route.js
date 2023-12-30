const express = require("express");
const {
  getAllDoctors,
  createTables,
  findById,
  findIfExists,
  addDoctor,
  updatePass,
  addAvailableTimes,
} = require("../models/Doctor.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await createTables();
    const doctors = await getAllDoctors();
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  try {
    await createTables();
    const doctor = await findIfExists(req.body.email);
    if (doctor.length > 0) {
      return res.send({
        message: "Doctor already exists",
      });
    }
    const value = req.body;
    console.log(value);
    await addDoctor(value);
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
    const doctor = await findById(docID);
    if (docID == doctor[0].id && password == doctor[0].password) {
      const token = jwt.sign({ foo: "bar" }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.send({
        message: "Successful",
        user: { ...doctor[0], userType: "doctor" },
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

router.post("/availability", async (req, res) => {
  console.log(req.body);
  const docId = req.body.id;
  const startMorningTime = req.body.MAS;
  const endMorningTime = req.body.MAE;
  const startEveningTime = req.body.EAS;
  const endEveningTime = req.body.EAE;
  try {
    const doctor = await findById(docId);
    if (doctor.length > 0) {
      const times = [];
      let currentTime = startMorningTime;

      while (currentTime <= endMorningTime) {
        times.push(currentTime);
        const [hours, minutes] = currentTime.split(":");
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        const newTime = totalMinutes + 15;
        const newHours = Math.floor(newTime / 60);
        const newMinutes = newTime % 60;
        currentTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
          .toString()
          .padStart(2, "0")}`;
      }
      currentTime = startEveningTime;
      while (currentTime <= endEveningTime) {
        times.push(currentTime);
        const [hours, minutes] = currentTime.split(":");
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        const newTime = totalMinutes + 15;
        const newHours = Math.floor(newTime / 60);
        const newMinutes = newTime % 60;
        currentTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
          .toString()
          .padStart(2, "0")}`;
        console.log(currentTime);
      }
      console.log(times);
      await addAvailableTimes(docId, times);
      res.send({
        message: "Successful",
        user: { ...doctor[0], userType: "doctor" },
      });
    } else {
      res.status(404).send({ message: "Doctor not found" });
    }
  } catch (error) {
    console.log({ message: "Available times error" });
    console.log(error);
  }
});

router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const password = req.body.password;
  try {
    await updatePass(password, id);
    const doctor = await findById(id);
    if (doctor[0].password === password) {
      return res.status(200).send({
        message: "password updated",
        user: { ...doctor[0], userType: "doctor" },
      });
    } else {
      return res.send({ message: `password not updated` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "error" });
  }
});

module.exports = router;
