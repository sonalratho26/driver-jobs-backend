const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/users.controller");
const imageUploader = require("../helpers/imageUploader");
const multer = require("multer");

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

router.get(
  "/users",
  usercontroller.listUser,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/users/:id",
  usercontroller.listUserById,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.post(
  "/users",
  upload.single("image_src"),
  usercontroller.createUser,
  async (req, res, next) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res
      .status(400)
      .send({ message: error.message, status: "failed", statusCode: "400" });
  }
);

router.put(
  "/edit/users/:user_uuid",
  imageUploader.upload.single("image_src"),
  usercontroller.updateUser,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete(
  "/delete/users/:user_uuid",
  usercontroller.DeleteUser,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post(
  "/login",
  // imageUploader.upload.single("image_src"),
  upload.single("image_src"),
  usercontroller.Login,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.get(
  "/logout",
  usercontroller.Logout,
  (req, res) => {
    res.send(req.data);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
module.exports = router;
