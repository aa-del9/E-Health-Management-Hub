const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");
const mongoose = require("mongoose");
const {
  createCredTable,
  findCredQuery,
  addQuery,
  findIfExistsQuery,
  getCredsWithEmailQuery,
  deleteRow,
} = require("../configs/queries/admin");
// const knex = require("knex")({
//   client: "pg",
//   connection: {
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE,
//   },
// });

const adminSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "admin",
  },

  adminID: {
    type: Number,
    required: true,
  },

  adminName: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
  },

  age: {
    type: Number,
  },

  mobile: {
    type: Number,
    minlength: 10,
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
});

const AdminModel = mongoose.model("admin", adminSchema);

const AdminCredModel = {
  id: 0,
  password: "",
};

const createTables = () => {
  dbhelper.query(createCredTable, [], (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("admin table created or exists");
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

const getAdminCredsFromEmail = (email) => {
  console.log("email received:", email);
  return dbhelper.query(getCredsWithEmailQuery, [email]).then((result) => {
    console.log(result, "in db helper");
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

const addAdmin = (admin) => {
  console.log("admin received:", admin);
  const array = Object.values(admin);
  console.log(array);
  return dbhelper.query(addQuery, array).then((result) => {
    console.log("admin added successfully");
    return result;
  });
};

const deleteAdmin = (email) => {
  console.log("admin email received:", email);
  return dbhelper.query(deleteRow, [email]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};
module.exports = {
  AdminModel,
  findIfExists,
  AdminCredModel,
  createTables,
  findCred,
  addAdmin,
  getAdminCredsFromEmail,
  deleteAdmin,
};
