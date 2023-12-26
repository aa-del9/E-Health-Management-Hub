const countReportQuery = `SELECT COUNT(*) FROM reports;`;

const createReportQuery = `INSERT INTO reports (
    patientid,
    doctorid,
    date,
    time,
    disease,
    temperature,
    weight,
    bp,
    glucose,
    info
  )
VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
  )`;
const getLastReportIdQuery = `SELECT id
from reports
ORDER BY id DESC
LIMIT 1;`;

module.exports = { getLastReportIdQuery, countReportQuery, createReportQuery };
