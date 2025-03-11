import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.user;
const { TokenExpiredError } = jwt;
const ROLES = db.ROLES;


export const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Ubauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "unauthorized!" })
}




export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

export const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

export const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

export const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

export const checkRole = (roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.userRole)) {
          return res.status(403).send({ message: "Require proper role!" });
      }
      next();
  };
};




// export default {
//   catchError,
//   verifyToken,
//   isAdmin,
//   isModerator,
//   isModeratorOrAdmin,
// };
// module.exports = authJwt;