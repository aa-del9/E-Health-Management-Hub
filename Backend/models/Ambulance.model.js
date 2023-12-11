const mongoose = require("mongoose");
const db = require("../configs/db");
const dbhelper = require("../configs/dbhelper");
const {
  createTableQuery,
  addQuery,
  findIfExistsQuery,
} = require("../configs/queries/ambulance");
const ambulanceSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  charges: {
    type: Number,
    required: true,
  },

  ambulanceID: {
    type: Number,
    required: true,
  },

  ambulanceDriver: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },
});

const AmbulanceModel = mongoose.model("ambulance", ambulanceSchema);

const createTable = () => {
  console.log("here first");
  dbhelper.query(createTableQuery, [], (err, result) => {
    if (err) {
      console.error("Error: ", err);
    } else {
      console.log("Query result:", result.rows);
    }
  });
};

const findIfExists = (numplate) => {
  console.log("numplate received to db:", numplate);
  return dbhelper.query(findIfExistsQuery, [numplate]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const addAmbulance = (ambulance) => {
  console.log("ambulance received:", ambulance);
  const array = Object.values(ambulance);
  console.log(array);
  return dbhelper.query(addQuery, array).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};
module.exports = { AmbulanceModel, findIfExists, addAmbulance, createTable };
