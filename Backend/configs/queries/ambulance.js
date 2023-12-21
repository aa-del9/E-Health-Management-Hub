const createTableQuery = `CREATE TABLE IF NOT EXISTS ambulance(
    numPlate VARCHAR(8) PRIMARY KEY,
    ambuType VARCHAR(50) NOT NULL,
    pph INT NOT NULL,
    driverName VARCHAR(255) NOT NULL,
    driverNum BIGINT NOT NULL
);`;

const findIfExistsQuery = `SELECT numplate FROM ambulance WHERE numplate = $1;`;
const countAmbulanceQuery = `SELECT COUNT(*) FROM ambulance;`;
const addQuery = `INSERT INTO ambulance VALUES ($1, $2, $3, $4, $5);`;
module.exports = {
  createTableQuery,
  countAmbulanceQuery,
  addQuery,
  findIfExistsQuery,
};
