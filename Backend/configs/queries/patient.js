const createTableQuery = `CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phoneNum BIGINT NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender CHAR(1),
  bloodGroup VARCHAR(3),
  DOB DATE,
  address VARCHAR(255),
  docID INT,
  FOREIGN KEY (docID) REFERENCES doctors(id)
);`;

const findCredQuery = `SELECT id,password,email FROM patients WHERE id = $1;`;

const getCredsWithEmailQuery = `SELECT id,password FROM patients WHERE email = $1;`;

const addQuery = `INSERT INTO patients (
    name,
    phonenum,
    email,
    password,
    age,
    gender,
    bloodgroup,
    dob,
    address
  )
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9
  );
  `;

const findIfExistsQuery = `SELECT email FROM patients WHERE email = $1;`;

const getAllQuery = `SELECT * FROM patient_details;`;

const countPatientQuery = `SELECT COUNT(*) FROM patients;`;

const updatePassQuery = ` UPDATE patients SET password = $1 WHERE id = $2;`;

module.exports = {
  findIfExistsQuery,
  createTableQuery,
  findCredQuery,
  getAllQuery,
  addQuery,
  getCredsWithEmailQuery,
  countPatientQuery,
  updatePassQuery,
};
