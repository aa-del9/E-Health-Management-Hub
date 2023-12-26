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

module.exports = { createMedicineQuery };
