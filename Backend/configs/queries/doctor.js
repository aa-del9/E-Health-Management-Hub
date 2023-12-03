const createCredTable = `CREATE TABLE IF NOT EXISTS doccred (
    id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  )`;

let findQuery = `SELECT * FROM doccred WHERE id = $1
  `;

const addQuery = () => {
  `INSERT INTO doccred (id) VALUES (${id})`,
    `INSERT INTO doccred (password) VALUES (${password})`;
};

module.exports = { createCredTable, findQuery, addQuery };
