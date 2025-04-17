import db from "../models/index.js";

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

// Cập nhật user (Admin & Moderator)
export const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    await user.update({ username, email, password, role });

    res.status(200).send({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
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

