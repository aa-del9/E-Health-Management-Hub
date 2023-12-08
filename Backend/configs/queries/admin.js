const createCredTable = `CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  )`;

const findCredQuery = `SELECT id,password FROM doctors WHERE id = $1;`;

const addQuery = () => {
  `INSERT INTO admins (id) VALUES (${id})`,
    `INSERT INTO admins (password) VALUES (${password})`;
};

module.exports = { createCredTable, findCredQuery, addQuery };
