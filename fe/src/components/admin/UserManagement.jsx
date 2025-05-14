// src/components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "user",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(response.data || response);
      } catch (err) {
        setError("Không thể tải danh sách người dùng.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for add or edit
  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "user",
      });
    } else {
      setEditingUser(null);
      setFormData({ email: "", firstName: "", lastName: "", role: "user" });
    }
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // Update user
        await updateUser(editingUser._id, formData);
        setUsers(
          users.map((u) =>
            u._id === editingUser._id ? { ...u, ...formData } : u
          )
        );
      } else {
        // Create user
        const newUser = await createUser(formData);
        setUsers([...users, newUser.data || newUser]);
      }

      setIsModalOpen(false);
      setEditingUser(null);
      setFormData({ email: "", firstName: "", lastName: "", role: "user" });
    } catch (err) {
      alert("Lỗi khi lưu người dùng");
      console.error(err);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert("Không thể xóa người dùng");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center p-4">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Quản lý người dùng
        </h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thêm người dùng
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left hidden md:table-cell">
                Tên
              </th>
              <th className="py-3 px-4 border-b text-left hidden md:table-cell">
                Họ
              </th>
              <th className="py-3 px-4 border-b text-left">Vai trò</th>
              <th className="py-3 px-4 border-b text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b hidden md:table-cell">
                    {user.firstName}
                  </td>
                  <td className="py-3 px-4 border-b hidden md:table-cell">
                    {user.lastName}
                  </td>
                  <td className="py-3 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-3 px-4 border-b text-right space-x-2">
                    <button
                      onClick={() => openModal(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  Không có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingUser ? "Sửa người dùng" : "Thêm người dùng"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">Người dùng</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
