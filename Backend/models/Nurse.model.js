//const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");
const {
  createTableQuery,
  findQuery,
  addQuery,
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
  return dbhelper.query(createTableQuery, 0, (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("Patient Credits Table created or  already exists.");
    }
  });
};

const findById = (ID) => {
  console.log("id received:", ID);
  return dbhelper.query(findQuery, [ID]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const adds = () => {
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

const add = async (data) => {
  console.log(data);
  console.log(Object.entries(data));
  const insertQuery = () => {
    return knex("pat_cred").insert(data);
  };
  const insertQueries = Object.entries(data).map(([columnName, value]) => {
    return knex("pat_cred").insert({ [columnName]: value });
  });
  try {
    await insertQuery();

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
  }
  // try {
  //   //console.log(insertQueries);
  //   await Promise.all(insertQueries);
  //   console.log("Data inserted successfully");
  // } catch (error) {
  //   console.error("Error inserting data:", error);
  // } finally {
  //   knex.destroy();
  // }
};

// // Create the nurses table
// db.none(nurseSchema)
//   .then(() => {
//     console.log("Nurses table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating nurses table:", error);
//   });

module.exports = { add, NurseModel, createTable, patientCredModel, findById };
