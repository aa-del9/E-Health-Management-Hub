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

const getMedFromPatientId = `select * from medication where reportid in (select id from reports where patientid = $1)`;

module.exports = { createMedicineQuery, getAllQuery, getMedFromPatientId };
