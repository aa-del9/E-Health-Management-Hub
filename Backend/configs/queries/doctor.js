const createCredTable = `CREATE TABLE IF NOT EXISTS doctors (
  id INT PRIMARY KEY,
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
//todo: change columns
const addQuery = () => {
  `INSERT INTO doctors (id) VALUES (${id})`,
    `INSERT INTO doctors (password) VALUES (${password})`;
};

const getAllQuery = `SELECT * FROM doctors;`;
module.exports = { createCredTable, findCredQuery, getAllQuery, addQuery };
