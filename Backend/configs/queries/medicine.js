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

const getMedFromPatientId = `SELECT medication.*,reports.date || '  ' || reports.time AS dateTime
FROM medication,reports
WHERE (medication.reportid=reports.id and reports.patientid = $1)`;

module.exports = { createMedicineQuery, getAllQuery, getMedFromPatientId };
