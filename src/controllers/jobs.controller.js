require("dotenv").config();
var Jobs = require("../models/jobs");
var auth = require("../helpers/auth");

const listJobs = async function (req, res) {
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Jobs.getJobs()
          .then(async function (result) {
            return res.status(200).json(result);
          })
          .catch(function (error) {
            return res.status(400).json({
              message: error,
              statusCode: 400,
            });
          });
      } else {
        return res.status(403).json({
          message: "Authorization Error",
          statusCode: "403",
        });
      }
    })
    .catch(function (error) {
      return res.status(403).json({
        message: "Authorization Error",
        statusCode: "403",
      });
    });
};


const listJobsById = async function (req, res) {
  const { jobid } = req.params;
  console.log(req.params);
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Jobs.JobGetByJobID(jobid)
          .then(async function (result) {
            return res.status(200).json(result);
          })
          .catch(function (error) {
            return res.status(400).json({
              message: error,
              statusCode: 400,
            });
          });
      } else {
        return res.status(403).json({
          message: "Authorization Error",
          statusCode: "403",
        });
      }
    })
    .catch(function (error) {
      return res.status(403).json({
        message: "Authorization Error",
        statusCode: "403",
      });
    });
};


const listJobsByDriverId = async function (req, res) {
  const { id } = req.params;
console.log("user_id",id);
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Jobs.getJobsByDriverId(id)
          .then(async function (result) {
            return res.status(200).json(result);
          })
          .catch(function (error) {
            return res.status(400).json({
              message: error,
              statusCode: 400,
            });
          });
      } else {
        return res.status(403).json({
          message: "Authorization Error",
          statusCode: "403",
        });
      }
    })
    .catch(function (error) {
      return res.status(403).json({
        message: "Authorization Error",
        statusCode: "403",
      });
    });
};

const createJobs = async function (req, res) {
  const { name, driver_id, assign_status, description,job_location } = req.body;
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Jobs.AddJobs({
          name,
          driver_id,
          assign_status,
          description,
          job_location
        })
          .then(async function (result) {
            return res.status(200).json({
              message: "Succesfully! job Added",
              statusCode: "200",
            });
          })
          .catch(function (error) {
            return res.status(400).json({
              message: error,
              statusCode: 400,
            });
          });
      } else {
        return res.status(403).json({
          message: "Authorization Error",
          statusCode: "403",
        });
      }
    })
    .catch(function (error) {
      return res.status(403).json({
        message: "Authorization Error",
        statusCode: "403",
      });
    });
};

const updateJobs = (req, res) => {
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Jobs.JobGetByJobID(req?.params?.job_id)
          .then(async function (result) {
            if (result) {
              Jobs.UpdateJob({
                job_id: result.job_id,
                name: req.body.name,
                driver_id: req.body.driver_id,
                assign_status: req.body.assign_status,
                description: req.body.description,
                job_location: req.body.job_location
              })
                .then(async function (result) {
                  return res.status(200).json({
                    status: "success",
                    statusCode: "200",
                    message: "success! job data updated suucessfully",
                  });
                })
                .catch(function (error) {
                  return res.status(400).json({
                    message: error,
                    statusCode: "400",
                  });
                });
            } else {
              return res.status(400).json({
                message: "user not exist",
                statusCode: "400",
              });
            }
          })
          .catch(function (error) {
            return res.status(400).json({
              message: error,
              statusCode: "400",
            });
          });
      } else {
        return res.status(403).json({
          message: "Authorization Error",
          statusCode: "403",
        });
      }
    })
    .catch(function (error) {
      return res.status(403).json({
        message: "Authorization Error",
        statusCode: "403",
      });
    });
};

const DeleteJob = async function (req, res) {
  const { job_id } = req.params;
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Jobs.JobGetByJobID(job_id).then(async function (result) {
          if (result) {
            Jobs.deletejob(result.job_id)
              .then(async function (result) {
                return res.status(200).json({
                  message: "deleted successfully",
                  statusCode: "200",
                });
              })
              .catch(function (error) {
                return res.status(400).json({
                  message: error,
                  statusCode: "400",
                });
              });
          } else {
            return res.status(200).json({
              message: "user not exist",
              statusCode: "400",
            });
          }
        });
      } else {
        return res.status(403).json({
          message: "Authorization Error",
          statusCode: "403",
        });
      }
    })
    .catch(function (error) {
      return res.status(403).json({
        message: "Authorization Error",
        statusCode: "403",
      });
    });
};

module.exports = {
  listJobs,
  createJobs,
  updateJobs,
  DeleteJob,
  listJobsById,
  listJobsByDriverId
};
