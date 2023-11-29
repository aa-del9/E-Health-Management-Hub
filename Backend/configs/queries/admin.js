const createCredTable = `CREATE TABLE IF NOT EXISTS admincred (
    id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  )`;

let findQuery = `SELECT * FROM admincred WHERE id = $1
  `;

const addQuery = () => {
  `INSERT INTO admincred (id) VALUES (${id})`,
    `INSERT INTO admincred (password) VALUES (${password})`;
};

module.exports = { createCredTable, findQuery, addQuery };
