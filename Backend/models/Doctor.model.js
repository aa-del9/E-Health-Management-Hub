const mongoose = require("mongoose");
const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");
const {
  createCredTable,
  findCredQuery,
  addQuery,
  findIfExistsQuery,
  getAllQuery,
  updatePassQuery,
  getCredsWithEmailQuery,
  countDoctorQuery,
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
      console.log("Doctor table created or exists.");
    }
  });
};
const getAllDoctors = () => {
  return dbhelper.query(getAllQuery).then((result) => {
    // console.log("in db helper", result);
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

const countDoctor = () => {
  return dbhelper.query(countDoctorQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result[0];
  });
};

const addDoctor = (doctor) => {
  console.log("doctor received:", doctor);
  const array = Object.values(doctor);
  console.log(array);
  return dbhelper.query(addQuery, array).then((result) => {
    console.log(result, "in db helper");
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

const updatePass = (password, id) => {
  return dbhelper.query(updatePassQuery, [password, id]).then((result) => {
    console.log("in db helper", result);
    return result;
  });
};
const getDoctorCredFromEmail = (email) => {
  console.log("email received:", email);
  return dbhelper.query(getCredsWithEmailQuery, [email]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

module.exports = {
  DoctorModel,
  docModel,
  getAllDoctors,
  createTables,
  findById,
  findIfExists,
  addDoctor,
  updatePass,
  getDoctorCredFromEmail,
  countDoctor,
};
