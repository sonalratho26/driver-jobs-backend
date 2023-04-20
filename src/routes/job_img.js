const express = require("express");
const router = express.Router();
const job_imgcontroller = require("../controllers/job_img.controller");
const imageUploader = require("../helpers/imageUploader");
router.get(
  "/Job_img/:jobid",
  job_imgcontroller.listJob_img,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// router.post(
//   "/Job_img",
//   job_imgcontroller.createJob_img,
//   async (req, res, next) => {
//     res.send(req.data);
//   },
//   (error, req, res, next) => {
//     res
//       .status(400)
//       .send({ message: error.message, status: "failed", statusCode: "400" });
//   }
// );

// router.put(
//   "/edit/Job_img/:job_id",
//   imageUploader.upload.single("image_src"),
//   jobscontroller.updateJobs,
//   (req, res) => {
//     res.send(req.data);
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

router.delete(
  "/delete/job_img/:job_id",
  job_imgcontroller.DeleteJob_img,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
