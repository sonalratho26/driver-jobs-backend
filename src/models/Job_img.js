const pool = require("../../config");

const getJob_img = () => {
  return new Promise(function (resolve, reject) {
    pool
      .query(`SELECT * FROM job_images`, [])
      .then(function (results) {
        resolve(results.rows);
      })
      .catch(function (err) {
        console.log("err", err);
        reject(err);
      });
  });
};
const AddJob_img = (request, response) => {
  const { job_id } = request.body;
  return new Promise(function (resolve, reject) {
    request.files.map((data, index) => {
      const base64Data = Buffer.from(data.buffer).toString("base64");
      let image_src = base64Data;
      pool
        .query("INSERT INTO job_images (images, job_id) VALUES ($1,$2)", [
          image_src,
          job_id,
        ])
        .then(function (result) {
          resolve(result.rows);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  });
};

async function Job_imgGetByJobID(job_id) {
  if (!job_id) {
    reject("error: id missing");
  } else {
    return new Promise((resolve) => {
      pool.query(
        "SELECT * FROM job_images  WHERE job_id = $1",
        [job_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          return resolve(results.rows);
        }
      );
    });
  }
}
const deletejob_img = (job_id) => {
  return new Promise(function (resolve, reject) {
    if (!job_id) {
      console.log("error: id missing");
      reject("error: id missing");
    } else {
      pool
        .query("DELETE FROM job_images WHERE job_id = $1", [job_id])
        .then(async function (result) {
          resolve(result.rows);
        })
        .catch(function (error) {
          reject(error);
        });
    }
  });
};
module.exports = {
  getJob_img,
  AddJob_img,
  Job_imgGetByJobID,
  deletejob_img,
};
