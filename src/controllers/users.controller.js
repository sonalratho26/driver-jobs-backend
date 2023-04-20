require("dotenv").config();
var User = require("../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var auth = require("../helpers/auth");

const listUser = async function (req, res) {
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        User.getUsers()
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

const createUser = async function (req, res) {
  const base64Data = req?.file
    ? Buffer.from(req?.file?.buffer).toString("base64")
    : null;
  let image_src = base64Data;

  let { name, email, password, mobile, address, role_id,job_id } = req.body;
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        User.AddUser({
          name,
          email,
          password,
          mobile,
          address,
          role_id,
          image_src,
          job_id
        })
          .then(async function (result) {
            return res.status(200).json({
              message: "Succesfully! user Added",
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

const updateUser = (req, res) => {
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        User.UserGetByUUID(req?.params?.user_uuid)
          .then(async function (result) {
            if (result) {
              const base64Data = req?.file
                ? Buffer.from(req?.file?.buffer).toString("base64")
                : null;
              let image_src = base64Data;
              if (result.password === req.body.password) {
                User.UpdateuserWithoutPassword({
                  user_id: result.user_id,
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  mobile: req.body.mobile,
                  address: req.body.address,
                  role_id: req.body.role_id ? req.body.role_id : result.role_id,
                  image_src: image_src ? image_src : null,
                })
                  .then(async function (result) {
                    return res.status(200).json({
                      status: "success",
                      statusCode: "200",
                      message: "success! user data updated suucessfully",
                    });
                  })
                  .catch(function (error) {
                    return res.status(400).json({
                      message: error,
                      statusCode: "400",
                    });
                  });
              } else {
                const base64Data = req?.file
                  ? Buffer.from(req?.file?.buffer).toString("base64")
                  : null;
                let image_src = base64Data;
                User.Updateuser({
                  user_id: result.user_id,
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  mobile: req.body.mobile,
                  address: req.body.address,
                  role_id: req.body.role_id,
                  image_src: image_src,
                })
                  .then(async function (result) {
                    return res.status(200).json({
                      status: "success",
                      statusCode: "200",
                      message: "success! user data updated suucessfully",
                    });
                  })
                  .catch(function (error) {
                    return res.status(400).json({
                      message: error,
                      statusCode: "400",
                    });
                  });
              }
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
              statusCode: "500",
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

const DeleteUser = async function (req, res) {
  const { user_uuid } = req.params;
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        User.UserGetByUUID(user_uuid).then(async function (result) {
          if (result) {
            User.deleteuser(result.user_id)
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

const Login = (req, res) => {
  const { email, password } = req.body;
  User.isUserExists(email).then((isExists) => {
    if (!isExists) {
      return res.status(400).json({
        status: "failed",
        message: "user not exist!",
        statusCode: "400",
      });
    }
    User.getOneUser(email).then(
      (user) => {
        bcrypt.compare(
          password,
          user.password,
          function (error, isvalidpassword) {
            if (error) {
              throw error;
            }
            if (!isvalidpassword) {
              return res.status(401).json({
                status: "failed",
                message: "invalid password!",
                statusCode: "401",
              });
            } else {
              var token = jwt.sign(
                {
                  id: user.user_id,
                },
                process.env.API_SECRET,
                {
                  expiresIn: 86400,
                }
              );
              const id = user.user_id;
              const name = user.name;
              const email = user.email;
              const image_src = user.image_src;
              User.createUserSession({ token, id })
                .then(function () {
                  res.cookie(`Cookie token name`, {
                    secret: "yoursecret",
                    cookie: { maxAge: 6000 },
                  });
                  res.status(200).send({
                    message: "Login successfully",
                    status: "true",
                    statusCode: "200",
                    name: name,
                    email: email,
                    image_src: image_src,
                    accessToken: token,
                    id:id,
                    role_id:user.role_id,
                    uuid:user.user_uuid,
                    job_id:user?.job_id
                  });
                })
                .catch(function (error) {
                  return res.status(400).json({
                    message: error,
                    statusCode: 400,
                  });
                });
            }
          }
        );
      },
      (error) => {
        res.status(400).json({
          status: "false",
          statusCode: "400",
          message: "Error while login.",
        });
      }
    );
  });
};
const Logout = (req, res) => {
  const { token } = req.body;
  let tokanData = req.headers["authorization"];
  auth
    .logout(tokanData)
    .then(function () {
      res.status(200).send({
        message: "LogOut successfully",
        status: "successfully",
        statusCode: "200",
      });
    })
    .catch(function (error) {
      return res.status(400).json({
        message: error,
        statusCode: 400,
      });
    });
};



const listUserById = async function (req, res) {
  const { id } = req.params;
  console.log(req.params);
  let tokanData = req.headers["authorization"];
  auth
    .AUTH(tokanData)
    .then(async function (result) {
      if (result) {
        User.getOneUserById(id)
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


module.exports = {
  listUser,
  createUser,
  updateUser,
  DeleteUser,
  Login,
  Logout,
  listUserById
};
