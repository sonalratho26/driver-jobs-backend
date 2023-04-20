const pool = require("../../config");

const expires_at = new Date(Date.now());

const getDriverReport = () => {
  const role_id = 1;
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM users where role_id=$1`, [role_id])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};
const getJobNameReport = () => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM jobs  `, [])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};
const getJobNameReportBylocation = (location) => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM jobs where job_location LIKE '%${location}%'`, [])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const getJobNameReportByDriverId = (driver_id) => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM jobs where driver_id = $1`, [driver_id])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const getJobNameReportByAllData = (location, dateData, driver_id) => {
  let data = dateData.split("to");
  let startDate = data[0];
  let endDate = data[1];

  return new Promise(function (resolve, reject) {
    pool
      .query(
        `SELECT * FROM jobs WHERE job_date >= $1 AND job_date < $2  AND job_location LIKE '%${location}%' AND driver_id = $3`,
        [startDate, endDate,driver_id]
      )
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const getJobNameReportBydate = ( dateData) => {
  let data = dateData.split("to");
  let startDate = data[0];
  let endDate = data[1];

  return new Promise(function (resolve, reject) {
    pool
      .query(
        `SELECT * FROM jobs WHERE job_date >= $1 AND job_date < $2`,
        [startDate, endDate]
      )
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};





const getJobNameReportBylocationId = (location,driver_id) => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM jobs where job_location LIKE '%${location}%' and driver_id = $1`, [driver_id])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};



const getJobNameReportByAllDataId = (dateData, driver_id) => {
  let data = dateData.split("to");
  let startDate = data[0];
  let endDate = data[1];

  return new Promise(function (resolve, reject) {
    pool
      .query(
        `SELECT * FROM jobs WHERE job_date >= $1 AND job_date < $2   AND driver_id = $3`,
        [startDate, endDate,driver_id]
      )
      .then(function (results) {
        console.log("results.rows",results.rows);
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const getJobNameReportBydateId = ( dateData,driver_id) => {
  let data = dateData.split("to");
  let startDate = data[0];
  let endDate = data[1];

  return new Promise(function (resolve, reject) {
    pool
      .query(
        `SELECT * FROM jobs WHERE job_date >= $1 AND job_date < $2  AND driver_id = $3`,
        [startDate, endDate,driver_id]
      )
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};




const getDriverByDriverId = (id) => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM users where user_id=$1`, [id])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

module.exports = {
  getDriverReport,
  getJobNameReport,
  getDriverByDriverId,
  getJobNameReportBylocation,
  getJobNameReportBydate,
  getJobNameReportByDriverId,
  getJobNameReportByAllData,
  getJobNameReportBylocationId,
  getJobNameReportBydateId,
  getJobNameReportByAllDataId
};
