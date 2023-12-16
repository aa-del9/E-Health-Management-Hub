const createTableQuery = `CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phoneNum BIGINT,
  email VARCHAR(255),
  password VARCHAR(255),
  age INT,
  gender CHAR(1),
  bloodGroup CHAR(2),
  DOB DATE,
  address VARCHAR(255),
  disease VARCHAR(50),
  details VARCHAR(255),
  docID INT,
  FOREIGN KEY (docID) REFERENCES doctors(id)
);`;

const findCredQuery = `SELECT id,password FROM patients WHERE id = $1;`;
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
module.exports = {
  findIfExistsQuery,
  createTableQuery,
  findCredQuery,
  getAllQuery,
  addQuery,
  getCredsWithEmailQuery,
};
