const express = require("express");
const { countAdmin } = require("../models/Admin.model");
const { countDoctor } = require("../models/Doctor.model");
const { countPatient } = require("../models/Nurse.model");
const { countAmbulance } = require("../models/Ambulance.model");
const { countReport } = require("../models/Report.model");
const { countAppointment } = require("../models/Appointment.model");
const { AppointmentModel } = require("../models/Appointment.model");
const { ReportModel } = require("../models/Report.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await countAdmin();
    const patients = await countPatient();
    const ambulances = await countAmbulance();
    const reports = await countReport();
    console.log(reports);
    const appointments = await countAppointment();
    const doctors = await countDoctor();
    let data = {
      admin: admins.count,
      patient: patients.count,
      ambulance: ambulances.count,
      report: reports.count,
      doctor: doctors.count,
      appointment: appointments.count,
    };
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = router;
