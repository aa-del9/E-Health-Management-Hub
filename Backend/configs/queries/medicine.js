const createMedicineQuery = `INSERT INTO medication (
    name,
    dosage,
    frequency,
    duration,
    reportid
  )
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
  );`;
const getAllQuery = `SELECT * FROM medication;`;

const getMedFromPatientId = `select medication.*,
reports.date || ' ' || reports.time AS dateTime
from medication,
reports
where (medication.reportid=reports.id and reports.patientid = $1)`;
module.exports = { createMedicineQuery, getAllQuery, getMedFromPatientId };
