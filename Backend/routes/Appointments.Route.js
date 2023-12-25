const express = require("express");
const {
  AppointmentModel,
  createAppointment,
  getAppointmentFromPatient,
  getAppointmentFromDoctor,
  deleteAppointment,
  findById,
} = require("../models/Appointment.model");

const { getDoctorCredFromEmail } = require("../models/Doctor.model");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const appointments = await AppointmentModel.find(query);
    res.status(200).send(appointments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/:userType/:id", async (req, res) => {
  const id = req.params.id;
  const userType = req.params.userType;
  try {
    const appointments =
      userType === "doctor"
        ? await getAppointmentFromDoctor(id)
        : await getAppointmentFromPatient(id);
    res.status(200).send({ message: "successful", data: appointments });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "error" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const doctor = await getDoctorCredFromEmail(req.body.docemail);
    if (doctor.length > 0) {
      const appointment = { ...payload, docid: doctor[0].id };
      delete appointment.docemail;
      console.log(appointment);
      await createAppointment(appointment);
      res.status(200).send({ message: "Successful" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  const payload = req.body;
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!appointment) {
      res.status(404).send({ msg: `Appointment with id ${id} not found` });
    }
    res.status(200).send(`Appointment with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:appointmentId", async (req, res) => {
  const id = req.params.appointmentId;
  try {
    const appointment = await findById(id);
    if (appointment.length > 0) {
      await deleteAppointment(id);
      res.status(200).send({ message: "successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "error" });
  }
});

module.exports = router;
