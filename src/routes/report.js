const express = require("express");
const router = express.Router();
const reportcontroller = require("../controllers/report.controller");

router.get(
  "/report",
  reportcontroller.listReport,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.get(
  "/report/job_location/:job_location",
  reportcontroller.Reportjob_location,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/report/job_locationId/:job_location",
  reportcontroller.Reportjob_locationId,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
