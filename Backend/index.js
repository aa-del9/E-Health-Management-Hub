const express = require("express");
require("dotenv").config();
const cors = require("cors");
const adminRouter = require("./routes/Admins.Route");
const ambulanceRouter = require("./routes/Ambulances.Route");
const appointmentRouter = require("./routes/Appointments.Route");
const doctorRouter = require("./routes/Doctors.Route");
const hospitalRouter = require("./routes/Hospitals.Route");
const patientRouter = require("./routes/Patients.Route");
const prescriptionRouter = require("./routes/Prescriptions.Route");
const reportRouter = require("./routes/Reports.Route");

const app = express();
const db = require("./configs/db");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Healthcare System");
});

app.use("/admin", adminRouter);
app.use("/ambulances", ambulanceRouter);
app.use("/appointments", appointmentRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/patients", patientRouter);
app.use("/prescriptions", prescriptionRouter);
app.use("/reports", reportRouter);

app.listen(process.env.port, async () => {
  await db.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database at", result.rows[0].now);
    }
  });
  console.log("Connected to DB");
  console.log(`Listening at port ${process.env.port}`);
});
