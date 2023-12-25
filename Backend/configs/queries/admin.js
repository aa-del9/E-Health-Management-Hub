const createCredTable = `CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phoneNum BIGINT NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT 'Admin@123',
  age INTEGER NOT NULL,
  gender CHAR(1) NOT NULL,
  DOB DATE,
  ADDRESS VARCHAR(255) NOT NULL
);`;

const countAdminQuery = `SELECT COUNT(*) FROM admins;`;
const findCredQuery = `SELECT id,password,email FROM admins WHERE id = $1;`;

const getCredsWithEmailQuery = `SELECT id,password FROM admins WHERE email = $1;`;

const addQuery = `INSERT INTO admins (
    name, phoneNum, email, age, gender, DOB, address)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;

const findIfExistsQuery = `SELECT email FROM admins WHERE email = $1;`;

const deleteRow = `DELETE FROM admins WHERE email = $1;`;

const updatePassQuery = ` UPDATE admins SET password = $1 WHERE id = $2;`;

const getAllQuery = `SELECT * FROM admins;`;

module.exports = {
  createCredTable,
  findIfExistsQuery,
  findCredQuery,
  addQuery,
  getCredsWithEmailQuery,
  deleteRow,
  countAdminQuery,
  updatePassQuery,
  getAllQuery,
};
