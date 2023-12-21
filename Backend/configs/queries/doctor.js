const createCredTable = `CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phoneNum BIGINT,
  email VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  age INTEGER,
  gender CHAR(1),
  bloodGroup VARCHAR(255),
  DOB DATE,
  address VARCHAR(255),
  education VARCHAR(255), 
  department VARCHAR(255),
  availability TIME []
);`;

const findCredQuery = `SELECT id,password FROM doctors WHERE id = $1;`;
const countDoctorQuery = `SELECT COUNT(*) FROM doctors;`;
const addQuery = `INSERT INTO doctors (
  name, phoneNum, email, age, gender, bloodGroup, DOB, address, education, department,fees)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

const updatePassQuery = ` UPDATE doctors SET password = $1 WHERE id = $2;`;

const getCredsWithEmailQuery = `SELECT id,password FROM doctors WHERE email = $1;`;
const getAllQuery = `SELECT * FROM doctors;`;
const findIfExistsQuery = `SELECT email FROM doctors WHERE email = $1;`;
module.exports = {
  findIfExistsQuery,
  createCredTable,
  findCredQuery,
  getAllQuery,
  addQuery,
  updatePassQuery,
  getCredsWithEmailQuery,
  countDoctorQuery,
};
