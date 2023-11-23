const createCredTable = `CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  )`;

const findCred = `SELECT * FROM admincred WHERE id = 
  `;

const addCred = `INSERT INTO pat_cred (id) VALUES (${id});
    INSERT INTO pat_cred (password) VALUES (${password})`;

module.exports = { createCredTable, findCredQuery, addCred };
