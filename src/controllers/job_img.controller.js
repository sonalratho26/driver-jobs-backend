require("dotenv").config();
var Job_img = require("../models/Job_img");
var auth = require("../helpers/auth");

const listJob_img = async function (req, res) {
  const { jobid } = req.params;
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Job_img.Job_imgGetByJobID(jobid)
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

const createJob_img = async function (req, res) {
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Job_img.AddJob_img(req)
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

// const updateJobs = (req, res) => {
//   let tokanData = req.headers["authorization"];
//   auth
//     .AUTH(tokanData)
//     .then(async function (result) {
//       if (result) {
//         Jobs.JobGetByJobID(req?.params?.job_id)
//           .then(async function (result) {
//             if (result) {
//               Jobs.UpdateJob({
//                 job_id: result.job_id,
//                 name: req.body.name,
//                 driver_id: req.body.driver_id,
//                 assign_status: req.body.assign_status,
//                 description: req.body.description,
//               })
//                 .then(async function (result) {
//                   return res.status(200).json({
//                     status: "success",
//                     statusCode: "200",
//                     message: "success! user data updated suucessfully",
//                   });
//                 })
//                 .catch(function (error) {
//                   return res.status(400).json({
//                     message: error,
//                     statusCode: "400",
//                   });
//                 });
//             } else {
//               return res.status(400).json({
//                 message: "user not exist",
//                 statusCode: "400",
//               });
//             }
//           })
//           .catch(function (error) {
//             return res.status(400).json({
//               message: error,
//               statusCode: "400",
//             });
//           });
//       } else {
//         return res.status(403).json({
//           message: "Authorization Error",
//           statusCode: "403",
//         });
//       }
//     })
//     .catch(function (error) {
//       return res.status(403).json({
//         message: "Authorization Error",
//         statusCode: "403",
//       });
//     });
// };

const DeleteJob_img = async function (req, res) {
  const { job_id } = req.params;
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Job_img.Job_imgGetByJobID(job_id).then(async function (result) {
          if (result) {
            Job_img.deletejob_img(result.job_id)
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
            return res.status(400).json({
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
  listJob_img,
  createJob_img,
  //   updateJobs,
  DeleteJob_img,
};
