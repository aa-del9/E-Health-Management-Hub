const { Pool } = require("pg");
const config = require("./config");
require("dotenv").config();

module.exports = new Pool(config);
