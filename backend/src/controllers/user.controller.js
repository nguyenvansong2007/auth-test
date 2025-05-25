import db from "../models/index.js";
import bcrypt from "bcryptjs";
const { user: User, role: Role } = db;


// Lấy danh sách tất cả users (chỉ Admin mới có quyền)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email"],
      include: [{
        model: Role,
        attributes: ["name"], // <-- lấy tên role
        through: { attributes: [] } // bỏ các cột trung gian
      }]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Lấy thông tin user theo ID (Admin & Moderator có thể xem user khác)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "email"],
      include: [{
        model: Role,
        attributes: ["name"],
        through: { attributes: [] }
      }]
    });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Cập nhật user (Admin)

export const updateUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const userId = req.params.id;

    // Tìm người dùng
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Cập nhật thông tin cơ bản
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await user.update(updateData);

    // Xử lý cập nhật role nếu có gửi lên
    if (roles && Array.isArray(roles) && roles.length > 0) {
      const roleRecords = await Role.findAll({
        where: { name: roles },
      });

      if (roleRecords.length === 0) {
        return res.status(400).json({ message: 'No valid roles found!' });
      }

      // Đồng bộ các role mới cho người dùng
      await user.setRoles(roleRecords);
    }

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Xóa user (chỉ Admin mới có quyền)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    await user.destroy();
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// controllers/user.controller.js
export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  } try {
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "username", "email"]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error("Error finding user by email:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



//test

export const publicContent = (req, res) => {
  res.json({
    message: "PublicContent.",
    status: 200,
  });
}
export const userBorad = (req, res) => {
  res.json({
    message: "User Content.",
    status: 200,
  });
}
export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
}
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
}
