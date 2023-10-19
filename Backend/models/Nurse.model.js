const db = require("../configs/db");
const {
  createTableQuery,
  findQuery,
  addQuery,
} = require("../configs/queries/patient");
const mongoose = require("mongoose");

const nurseSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "nurse",
  },

  nurseID: {
    type: Number,
    required: true,
  },

  nurseName: {
    type: String,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: String,
  },

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },
});

const NurseModel = mongoose.model("nurse", nurseSchema);

//const db = require('./your-postgresql-connection-module'); // Import your PostgreSQL connection module

// Define the schema for the nurses table
// const createTable = {
//   text: `CREATE TABLE IF NOT EXISTS pat_cred (
//     id SERIAL PRIMARY KEY,
//     password VARCHAR(255) NOT NULL,
//   )`,
// };

const patientCredModel = {
  id: 0,
  password: "",
};

const createTable = () => {
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("Query result:", result.rows);
    }
  });
};

const findById = ({ ID, password, nurseID }) => {
  db.query(findQuery + ID + "", (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("Query result:", result.rows);
    }
  });
};

const add = () => {
  db.query(addQuery(), (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("Query result:", result.rows);
    }
  });
};

// // Create the nurses table
// db.none(nurseSchema)
//   .then(() => {
//     console.log("Nurses table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating nurses table:", error);
//   });

module.exports = { NurseModel, createTable, patientCredModel, findById };
