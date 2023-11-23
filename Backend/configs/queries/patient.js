const createTableQuery = `CREATE TABLE IF NOT EXISTS pat_cred (
    id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  )`;

let findQuery = `SELECT * FROM pat_cred WHERE id = $1
`;

const addQuery = () => {
  `INSERT INTO pat_cred (id) VALUES (${id})`,
    `INSERT INTO pat_cred (password) VALUES (${password})`;
};

module.exports = { createTableQuery, findQuery, addQuery };
