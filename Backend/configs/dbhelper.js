const db = require("./db.js");

exports.query = function (sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};
