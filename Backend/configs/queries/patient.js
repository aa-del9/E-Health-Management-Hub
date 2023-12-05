const createCredTable = `CREATE TABLE IF NOT EXISTS patients (
  id INT PRIMARY KEY,
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

let findCredQuery = `SELECT id,password FROM patients WHERE id = $1;`;
//todo: change columns
const addQuery = () => {
  `INSERT INTO patients (id) VALUES (${id})`,
    `INSERT INTO patients (password) VALUES (${password})`;
};

const getAllQuery = `SELECT * FROM patients;`;
module.exports = { createCredTable, findCredQuery, getAllQuery, addQuery };
