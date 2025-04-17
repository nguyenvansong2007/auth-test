// 'use strict';
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { auth_config } from "../config/auth.config.js";

const { user: User, role: Role, refreshToken: RefreshToken } = db;
const Op = db.Sequelize.Op;


// register 
export const register = async (req, res, next) => {
  // Save User to Database

  try {
    const user = await User.create({
      username: req.body.username,
      phonenumber: req.body.phonenumber,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      company: req.body.company,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    if (req.body.roles) {
      Role.findAll({
        where: { name: { [Op.or]: req.body.roles } }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }

  } catch (error) {
    res.status(500).send({ message: err.message });
    next(error);
  }
};



// LOGIN
export const login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, auth_config.secret, {
        expiresIn: auth_config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          phonenumber: user.phonenumber,
          firstname: user.firstname,
          lastname: user.lastname,
          company: user.company,
          email: user.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

};


// refresh token
export const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, auth_config.secret, {
      expiresIn: auth_config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};




export const getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ where: { id: req.user.userId } });
      data.user = { userName: user.name }
    }
    res.status(200).json({
      status: 'success',
      data: data,
    })

  } catch (error) {
    res.json(error);
    next(error);
  }
}

