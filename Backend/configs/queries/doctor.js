const createCredTable = `CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phoneNum BIGINT NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT 'Doctor@123',
  age INTEGER NOT NULL,
  gender CHAR(1) NOT NULL,
  bloodGroup VARCHAR(3) NOT NULL,
  DOB DATE NOT NULL,
  address VARCHAR(255) NOT NULL,
  education VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  availability TIME [] NOT NULL DEFAULT ARRAY ['10:00'::TIME, '10:15'::TIME, '10:30'::TIME, '10:45'::TIME, 
        '11:00'::TIME, '11:15'::TIME, '11:30'::TIME, '11:45'::TIME, 
        '14:00'::TIME, '14:15'::TIME, '14:30'::TIME, '14:45'::TIME, 
        '15:00'::TIME, '15:15'::TIME, '15:30'::TIME, '15:45'::TIME, 
        '16:00'::TIME],
  fees INT NOT NULL
);`;

const findCredQuery = `SELECT id,password,email FROM doctors WHERE id = $1;`;
const countDoctorQuery = `SELECT COUNT(*) FROM doctors;`;
const addQuery = `INSERT INTO doctors (
  name, phoneNum, email, age, gender, bloodGroup, DOB, address, education, department,fees)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

const updatePassQuery = ` UPDATE doctors SET password = $1 WHERE id = $2;`;

const getCredsWithEmailQuery = `SELECT id,password FROM doctors WHERE email = $1;`;
const getAllQuery = `SELECT * FROM doctor_details;`;
const findIfExistsQuery = `SELECT email FROM doctors WHERE email = $1;`;

const addAvailableTimesQuery = `UPDATE doctors SET availability = $1 WHERE id = $2`;

const getDoctorsByDepartment = `SELECT id,name FROM doctors WHERE department = $1;`;
module.exports = {
  findIfExistsQuery,
  createCredTable,
  findCredQuery,
  getAllQuery,
  addQuery,
  updatePassQuery,
  getCredsWithEmailQuery,
  countDoctorQuery,
  addAvailableTimesQuery,
  getDoctorsByDepartment,
};
