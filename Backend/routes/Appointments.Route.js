const express = require("express");
const {
  createAppointment,
  getAppointmentFromPatient,
  getAppointmentFromDoctor,
  deleteAppointment,
  findById,
} = require("../models/Appointment.model");
const { getDoctorCredFromEmail } = require("../models/Doctor.model");
const router = express.Router();

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
