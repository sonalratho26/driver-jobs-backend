require("dotenv").config();
var Report = require("../models/report");

var auth = require("../helpers/auth");

const listReport = async function (req, res) {
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        Report.getJobNameReport().then(async function (Jobresult) {
          let coun = 0;
          let Jobreport = [];
          Jobresult.map((resd) => {
            Report.getDriverByDriverId(resd.driver_id)
              .then(async function (result) {
                let reportdata = {};
                reportdata["job_name"] = resd.name;
                reportdata["assign_status"] = resd.assign_status;
                reportdata["description"] = resd.description;
                result.map((e) => {
                  reportdata["driver_name"] = e.name;
                  Jobreport.push(reportdata);
                  coun++;
                });

                if (coun === Jobresult.length) {
                  return res.status(200).json(Jobreport);
                }
              })
              .catch(function (error) {
                return res.status(400).json({
                  message: error,
                  statusCode: "400",
                });
              });
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


const Reportjob_location = async function (req, res) {
  const { job_location } = req.params;

  let job_date = job_location.split("&");
  let job_locationData = job_date[0] ? job_date[0] : null;
  let dateData = job_date[1] ? job_date[1] : null;
  let nameData = job_date[2] ? JSON.parse(job_date[2]) : null;
  
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        if (dateData !== "nulltonull" && nameData !== null && job_locationData !== "null") {

          Report.getJobNameReportByAllData(
            job_locationData,
            dateData,
            nameData
          ).then(async function (Jobresult) {
            let coun = 0;
            let Jobreport = [];
            if (Jobresult.length) {
              Jobresult.map((resd) => {
                Report.getDriverByDriverId(resd.driver_id)
                  .then(async function (result) {
                    let reportdata = {};
                    reportdata["name"] = resd.name;
                    reportdata["assign_status"] = resd.assign_status;
                    reportdata["description"] = resd.description;
                    reportdata["job_location"] = resd.job_location;
                    result.map((e) => {
                      reportdata["driver_name"] = e.name;
                      Jobreport.push(reportdata);
                      
                    });
                    coun++;
                    if (coun === Jobresult.length) {
                      return res.status(200).json(Jobreport);
                    }
                  })
                  .catch(function (error) {
                    return res.status(400).json({
                      message: error,
                      statusCode: "400",

                    });
                  });
              });
            } else {
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobreport:0
              });
            }
          });
        } 
        else if(dateData !== "nulltonull"){
          Report.getJobNameReportBydate(dateData).then(
            async function (Jobresult) {
              if (Jobresult.length > 0) {
               
                let coun = 0;
                let Jobreport = [];
                Jobresult.map((resd) => {
                  Report.getDriverByDriverId(resd.driver_id)
                    .then(async function (result) {
                      let DriverData = result
                      let reportdata = {};
                      reportdata["name"] = resd.name;
                      reportdata["assign_status"] = resd.assign_status;
                      reportdata["description"] = resd.description;
                      reportdata["job_location"] = resd.job_location;
                      DriverData.map((e) => {
                        reportdata["driver_name"] = e.name;
                        Jobreport.push(reportdata);
                  
                      });
                      coun++;
                      if (coun === Jobresult.length) {
                        return res.status(200).json(Jobreport);
                      }
                    })
                    .catch(function (error) {
                      return res.status(400).json({
                        message: error,
                        statusCode: "400",
                      });
                    });
                });
              }
             else{
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobreport:0
              });
             }
            }
          );
        }
        else if(job_locationData !== "null"){
          Report.getJobNameReportBylocation(job_locationData).then(
            async function (Jobresult) {
              if (Jobresult.length > 0) {
               
                let coun = 0;
                let Jobreport = [];
                Jobresult.map((resd) => {
                  Report.getDriverByDriverId(resd.driver_id)
                    .then(async function (result) {
                      let reportdata = {};
                      reportdata["name"] = resd.name;
                      reportdata["assign_status"] = resd.assign_status;
                      reportdata["description"] = resd.description;
                      reportdata["job_location"] = resd.job_location;
                      result.map((e) => {
                        reportdata["driver_name"] = e.name;
                        Jobreport.push(reportdata);
                       
                      });
                      coun++;
                      if (coun === Jobresult.length) {
                        return res.status(200).json(Jobresult);
                      }
                    })
                    .catch(function (error) {
                      return res.status(400).json({
                        message: error,
                        statusCode: "400",
                      });
                    });
                });
              }
             else{
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobreport:0
              });
             }
            }
          );
        }
        else {
          Report.getJobNameReportByDriverId(nameData).then(
            async function (Jobresult) {
              if (Jobresult.length > 0) {
              let coun = 0;
              let Jobreport = [];
              Jobresult.map((resd) => {
                Report.getDriverByDriverId(resd.driver_id)
                  .then(async function (result) {
                    let reportdata = {};
                    reportdata["name"] = resd.name;
                    reportdata["assign_status"] = resd.assign_status;
                    reportdata["description"] = resd.description;
                    reportdata["job_location"] = resd.job_location;
                    result.map((e) => {
                      reportdata["driver_name"] = e.name;
                      Jobreport.push(reportdata);
                      
                    });
                    coun++;
                    if (coun === Jobresult.length) {
                      return res.status(200).json(Jobresult);
                    }
                  })
                  .catch(function (error) {
                    return res.status(400).json({
                      message: error,
                      statusCode: "400",
                    });
                  });
              });
            }
            else{
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobresult:0
              });
            }
            }
          );
        }
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


const Reportjob_locationId = async function (req, res) {
  const { job_location } = req.params;
console.log("job_location",job_location);
  let job_date = job_location.split("&");
  let job_locationData = job_date[0] ? job_date[0] : null;
  let dateData = job_date[1] ? job_date[1] : null;
  let driver_id = job_date[2] ? JSON.parse(job_date[2]) : null
  console.log("driver_id",driver_id);
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        if (dateData !== "nulltonull" && job_locationData !== "null" && driver_id !== null) {

          Report.getJobNameReportByAllDataId(
            dateData,
            driver_id
          ).then(async function (Jobresult) {
            console.log(Jobresult);
            let coun = 0;
            let Jobreport = [];
            if (Jobresult.length) {
              Jobresult.map((resd) => {
                Report.getDriverByDriverId(resd.driver_id)
                  .then(async function (result) {
                    let reportdata = {};
                    reportdata["name"] = resd.name;
                    reportdata["assign_status"] = resd.assign_status;
                    reportdata["description"] = resd.description;
                    reportdata["job_location"] = resd.job_location;
                    result.map((e) => {
                      reportdata["driver_name"] = e.name;
                      Jobreport.push(reportdata);
                      
                    });
                    coun++;
                    if (coun === Jobresult.length) {
                      return res.status(200).json(Jobreport);
                    }
                  })
                  .catch(function (error) {
                    return res.status(400).json({
                      message: error,
                      statusCode: "400",

                    });
                  });
              });
            } else {
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobreport:0
              });
            }
          });
        } 
        else if(dateData !== "nulltonull" && job_locationData === "null"){
          Report.getJobNameReportBydateId(dateData,driver_id).then(
            async function (Jobresult) {
              if (Jobresult.length > 0) {
               
                let coun = 0;
                let Jobreport = [];
                Jobresult.map((resd) => {
                  Report.getDriverByDriverId(resd.driver_id)
                    .then(async function (result) {
                      let DriverData = result
                      let reportdata = {};
                      reportdata["name"] = resd.name;
                      reportdata["assign_status"] = resd.assign_status;
                      reportdata["description"] = resd.description;
                      reportdata["job_location"] = resd.job_location;
                      DriverData.map((e) => {
                        reportdata["driver_name"] = e.name;
                        Jobreport.push(reportdata);
                  
                      });
                      coun++;
                      if (coun === Jobresult.length) {
                        return res.status(200).json(Jobreport);
                      }
                    })
                    .catch(function (error) {
                      return res.status(400).json({
                        message: error,
                        statusCode: "400",
                      });
                    });
                });
              }
             else{
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobreport:0
              });
             }
            }
          );
        }
        else if(job_locationData !== "null" && dateData === "nulltonull"){
          Report.getJobNameReportBylocationId(job_locationData,driver_id).then(
            async function (Jobresult) {
              if (Jobresult.length > 0) {
                let coun = 0;
                let Jobreport = [];
                Jobresult.map((resd) => {
                  Report.getDriverByDriverId(resd.driver_id)
                    .then(async function (result) {
                      let reportdata = {};
                      reportdata["name"] = resd.name;
                      reportdata["assign_status"] = resd.assign_status;
                      reportdata["description"] = resd.description;
                      reportdata["job_location"] = resd.job_location;
                      result.map((e) => {
                        reportdata["driver_name"] = e.name;
                        Jobreport.push(reportdata);
                       
                      });
                      coun++;
                      if (coun === Jobresult.length) {
                        return res.status(200).json(Jobresult);
                      }
                    })
                    .catch(function (error) {
                      return res.status(400).json({
                        message: error,
                        statusCode: "400",
                      });
                    });
                });
              }
             else{
              return res.status(400).json({
                message: "No data Found",
                statusCode: "400",
                Jobreport:0
              });
             }
            }
          );
        }
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
  listReport,
  Reportjob_location,
  Reportjob_locationId
};
