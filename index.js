console.log("hello start node server");

const express = require("express");
const bodyParser = require("body-parser");
const indexRouter = require("./src/routes/index");
const app = express();
const port = 3700;
const path = require("path");
const job_imgcontroller = require("./src/controllers/job_img.controller");
const multer = require("multer");

var cors = require("cors");
var cookieParser = require("cookie-parser");
app.use("/", indexRouter);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("public", express.static("public"));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/helpers/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// var upload = multer({ storage: storage });
var upload = multer({
  limits: {
    fileSize: 307200,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

app.post(
  "/Job_img",
  upload.array("images"),
  job_imgcontroller.createJob_img,
  async (req, res, next) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res
      .status(400)
      .send({ message: error.message, status: "failed", statusCode: "400" });
  }
);
