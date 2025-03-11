import bcrypt from 'bcryptjs';
import db from '../models/index.js';


const salt = bcrypt.genSaltSync(10);

//tạo user
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        username: data.username,
        roleId: data.roleId,
      })

      resolve('create a new user success');

    } catch (e) {
      reject(e)
    }
  })
}
//hash password
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }

  })
}

//hiển thị
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      })
      resolve(users);
    } catch (e) {
      reject(e)
    }
  })
}

//lấy id user
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true
      })

      if (user) {
        resolve(user);
      }
      else {
        resolve({})
      }
    } catch (e) {
      reject(e)
    }
  })
}

//edit user
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id }
      })
      if (user) {
        user.username = data.username;
        user.password = data.password;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e)
    }
  })
}

//xoa user
let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id }
      })

      if (user) {
        await user.destroy();
      }

      resolve();
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
}