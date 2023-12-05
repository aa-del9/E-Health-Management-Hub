const mongoose = require("mongoose");
const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");
const {
  createCredTable,
  findCredQuery,
  addQuery,
  getAllQuery,
} = require("../configs/queries/doctor");

const doctorSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "doctor",
  },

  docID: {
    type: Number,
    required: true,
  },

  docName: {
    type: String,
  },

  mobile: {
    type: Number,
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
    type: Date,
  },

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  department: {
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

const DoctorModel = mongoose.model("doctor", doctorSchema);

const docModel = {
  id: 0,
  name: "",
  phoneNum: 0,
  email: "",
  password: "",
  age: 0,
  gender: "",
  bloodGroup: "",
  dob: "",
  address: "",
  education: "",
  department: "",
  availability: [],
  fees: 0,
};

const createTables = () => {
  db.query(createCredTable, (err, result) => {
    if (err) {
      console.error("Error: ", err);
      // Handle the error, e.g., by sending a response or calling a callback with the error
    } else {
      // Process the query result, e.g., by sending it as a response or calling a callback with the result
      console.log("Query result:", result.rows);
    }
  });
};
const getAllDoctors = () => {
  return dbhelper.query(getAllQuery).then((result) => {
    // console.log("in db helper", result);
    return result;
  });
};

const findById = (ID) => {
  console.log("id received:", ID);
  return dbhelper.query(findCredQuery, [ID]).then((result) => {
    console.log("in db helper", result);
    return result;
  });
};

module.exports = {
  DoctorModel,
  docModel,
  getAllDoctors,
  createTables,
  findById,
};
