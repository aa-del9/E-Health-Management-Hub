const dbhelper = require("../configs/dbhelper");
const {
  createTableQuery,
  findCredQuery,
  getAllQuery,
  addQuery,
  findIfExistsQuery,
  getCredsWithEmailQuery,
  countPatientQuery,
  updatePassQuery,
} = require("../configs/queries/patient");

const createTable = () => {
  return dbhelper.query(createTableQuery, []).then((err, result) => {
    console.log("patient table created or exists");
  });
};

const countPatient = () => {
  return dbhelper.query(countPatientQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result[0];
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

const updatePass = (password, id) => {
  return dbhelper.query(updatePassQuery, [password, id]).then((result) => {
    console.log("in db helper", result);
    return result;
  });
};

module.exports = {
  addPatient,
  getAllPatients,
  createTable,
  findCred,
  findIfExists,
  getPatientCredFromEmail,
  countPatient,
  updatePass,
};
