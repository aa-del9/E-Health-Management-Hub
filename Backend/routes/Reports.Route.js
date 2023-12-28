const express = require("express");
const {
  ReportModel,
  createReport,
  getLastReportId,
} = require("../models/Report.model");
const { createMedicine } = require("../models/Prescription.model");
const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const reports = await ReportModel.find(query);
    res.status(200).send(reports);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
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

router.patch("/:reportId", async (req, res) => {
  const id = req.params.reportId;
  const payload = req.body;
  try {
    const report = await ReportModel.findByIdAndUpdate({ _id: id }, payload);
    if (!report) {
      res.status(404).send({ msg: `Report with id ${id} not found` });
    }
    res.status(200).send(`Report with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:reportId", async (req, res) => {
  const id = req.params.reportId;
  try {
    const report = await ReportModel.findByIdAndDelete({ _id: id });
    if (!report) {
      res.status(404).send({ msg: `Report with id ${id} not found` });
    }
    res.status(200).send(`Report with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
