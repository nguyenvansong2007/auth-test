import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const { user: User, refreshToken: RefreshToken } = db;
const Op = db.Sequelize.Op;


// register 
export const register = async (req, res, next) => {
  // Save User to Database
  try {
    const user = await db.create(req.body)
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          })
            .then(roles => {
              user.setRoles(roles).then(() => {
                res.send({ message: "User was registered successfully!" });
              });
              user.then(() => {
                res.send({ message: "User was registered successfully!" });
              });
            });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
    const token = jwt.sign(
      { id: user.id },
      config.secret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      status: 'success',
      data: {
        token,
        userName: user.username
      }
    })
  } catch (error) {
    next(error);
  }
  // User.create({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: bcrypt.hashSync(req.body.password, 8)
  // })

  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
};





// login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    // not found user
    if (!user) {
      const err = new Error("User Not found.");
      res.status(404);
      return next(err);
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    //password is valid
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return res.status(200).json({
        success: 'success',
        data: { token, username: user.username }
      })
    } else {
      const err = new Error('password is net correct');
      err.statusCode = 400;
      return next(err);
    }






    // const token = jwt.sign(user._id);
    // res.json({ success: true, token });



    let authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });

  } catch (err) {
    next(err);
  }
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
    let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: config.jwtExpiration,
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
      const user = await User.findOne({ where: { id: req.user.userId }});
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

// export default {
//   register,
//   login,
//   refreshToken,
//   getCurrentUser,
// }