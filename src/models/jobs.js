const pool = require("../../config");
const date = new Date().toISOString().split('T')[0];
console.log("date",date);
const getJobs = () => {
  console.log("getJobs");
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM jobs`, [])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        console.log("err", err);
        reject(err);
      });
  });
};

const AddJobs = (request, response) => {
  const {
    name,
    driver_id,
    assign_status,
    description,
    job_location,
  } = request;
  return new Promise(function (resolve, reject) {
    pool
      .query(
        "INSERT INTO jobs (name, driver_id,assign_status,description ,job_date,job_location) VALUES ($1,$2,$3,$4,$5,$6)",
        [name, driver_id, assign_status, description, date, job_location]
      )
      .then(function (result) {
        resolve(result.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

async function JobGetByJobID(job_id) {
  if (!job_id) {
    reject("error: id missing");
  } else {
    return new Promise((resolve) => {
      pool.query(
        "SELECT * FROM Jobs  WHERE job_id = $1",
        [job_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          return resolve(results.rows[0]);
        }
      );
    });
  }
}

const UpdateJob = (data) => {
  const { name, driver_id, assign_status, description, job_id,job_location } = data;
  let driver_id_int = parseInt(driver_id);
  console.log("name", name, driver_id_int, assign_status, description, job_id);
  return new Promise(function (resolve, reject) {
    pool
      .query(
        "UPDATE jobs SET name = $1, driver_id = $2 , Assign_status = $3 ,  Description = $4 , job_location = $5   WHERE job_id = $6",
        [name, driver_id_int, assign_status, description,job_location, job_id]
      )

      .then(function (result) {
        resolve(result.rows[0]);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const deletejob = (job_id) => {
  return new Promise(function (resolve, reject) {
    if (!job_id) {
      console.log("error: id missing");
      reject("error: id missing");
    } else {
      pool
        .query("DELETE FROM jobs WHERE job_id = $1", [job_id])
        .then(async function (result) {
          resolve(result.rows);
        })
        .catch(function (error) {
          reject(error);
        });
    }
  });
};


const getJobsByDriverId = (user_id) => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT jobs.job_id,jobs.name,driver_id,assign_status,description,job_date,job_location FROM jobs INNER JOIN users ON users.user_id = jobs.driver_id
    WHERE users.user_id = $1`, [user_id])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

module.exports = {
  getJobs,
  AddJobs,
  JobGetByJobID,
  UpdateJob,
  deletejob,
  getJobsByDriverId
};
