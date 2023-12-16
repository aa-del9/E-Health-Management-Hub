//const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");
const {
  createTableQuery,
  findCredQuery,
  getAllQuery,
  addQuery,
  findIfExistsQuery,
  getCredsWithEmailQuery,
} = require("../configs/queries/patient");
let x = false;
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
});
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

const patientCredModel = {
  id: 0,
  password: "",
};

const createTable = () => {
  return dbhelper.query(createTableQuery, [], (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("Patient Table created or  already exists.");
    }
  });
};

const findCred = (ID) => {
  console.log("id received:", ID);
  return dbhelper.query(findCredQuery, [ID]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};
const getPatientCredFromEmail = (email) => {
  console.log("email received:", email);
  return dbhelper.query(getCredsWithEmailQuery, [email]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};
const getAllPatients = () => {
  return dbhelper.query(getAllQuery).then((result) => {
    //console.log("in db helper", result);
    return result;
  });
};

const findIfExists = (email) => {
  console.log("email received to db:", email);
  return dbhelper.query(findIfExistsQuery, [email]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const addPatient = (patient) => {
  console.log("patient received:", patient);
  const array = Object.values(patient);
  console.log(array);
  return dbhelper.query(addQuery, array).then((result) => {
    console.log(result, "in db helper");
    return result;
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

module.exports = {
  addPatient,
  NurseModel,
  getAllPatients,
  createTable,
  patientCredModel,
  findCred,
  findIfExists,
  getPatientCredFromEmail,
};
