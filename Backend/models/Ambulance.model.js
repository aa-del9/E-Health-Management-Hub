const dbhelper = require("../configs/dbhelper");
const {
  createTableQuery,
  addQuery,
  findIfExistsQuery,
  countAmbulanceQuery,
} = require("../configs/queries/ambulance");

const createTable = () => {
  return dbhelper.query(createTableQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const findIfExists = (numplate) => {
  console.log("numplate received to db:", numplate);
  return dbhelper.query(findIfExistsQuery, [numplate]).then((result) => {
    console.log(result, "in db helper");
    return result;
  });
};

const countAmbulance = () => {
  return dbhelper.query(countAmbulanceQuery, []).then((result) => {
    console.log(result, "in db helper");
    return result[0];
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
module.exports = {
  findIfExists,
  addAmbulance,
  createTable,
  countAmbulance,
};
