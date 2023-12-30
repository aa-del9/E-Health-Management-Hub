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
  addAvailableTimesQuery,
} = require("../configs/queries/doctor");

const createTables = () => {
  return dbhelper.query(createCredTable, []).then((result) => {
    return result;
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

const addAvailableTimes = (id, availability) => {
  console.log("availability", availability);
  return dbhelper
    .query(addAvailableTimesQuery, [availability, id])
    .then((result) => {
      console.log(result, "in db helper");
      return result;
    });
};

module.exports = {
  getAllDoctors,
  createTables,
  findById,
  findIfExists,
  addDoctor,
  updatePass,
  getDoctorCredFromEmail,
  countDoctor,
  addAvailableTimes,
};
