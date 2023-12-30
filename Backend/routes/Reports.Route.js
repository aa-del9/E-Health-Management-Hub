const express = require("express");
const {
  ReportModel,
  createReport,
  getLastReportId,
  getDoctorReports,
  getPatientReports,
} = require("../models/Report.model");
const { createMedicine } = require("../models/Prescription.model");
const router = express.Router();

router.get("/:userType/:id", async (req, res) => {
  const id = req.params.id;
  const userType = req.params.userType;
  console.log("route :", userType, id);

  try {
    const reports =
      userType === "doctor"
        ? await getDoctorReports(id)
        : await getPatientReports(id);
    res.status(200).send({ message: "Successful", data: reports });
    console.log("router reports", reports);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
});

router.post("/create", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const data = { ...req.body };
    delete data.medicines;
    delete data.appointmentid;
    console.log(data);
    await createReport(data);
    //add medicines to medication table
    const reportId = await getLastReportId();
    const med = { rows: payload.medicines, reportid: reportId.id };
    med.rows.map(async (row) => {
      const array = Object.values(row);
      array.push(med.reportid);
      console.log(array);
      await createMedicine(array);
    });
    res.send({ message: "successful" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

module.exports = router;
