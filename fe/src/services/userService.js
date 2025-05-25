import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/v1/users/";

// Tạo instance Axios với base URL và interceptor tự động thêm header
const apiClient = axios.create({
  baseURL: API_URL,
});

// Thêm token vào mọi request
apiClient.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    ...authHeader(),
  };
  return config;
});

// === Public APIs (không cần token) ===
const getPublicContent = () => {
  return axios.get(API_URL + "all"); // hoặc "/test/all"
};

// === Protected APIs (cần token) ===
const getUserBoard = () => {
  return apiClient.get("profile");
};

const getModeratorBoard = () => {
  return apiClient.get("moderator");
};

const getAdminBoard = () => {
  return apiClient.get("admin");
};

// === Quản lý người dùng ===
const getAllUsers = () => {
  return axios.get(API_URL + "", { headers: authHeader() });
}

const findUserByEmail = (email) => {
  return apiClient.get(`?email=${encodeURIComponent(email)}`);
};

const createUser = (data) => {
  return axios.post(API_URL + "create-user", data, { headers: authHeader() });
};

const getUserById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
}
const updateUser = (id, data) => {
  return axios.put(API_URL + id, data, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};


const getAllProjectsCreatedByUser = (id) => {
  return axios.get(API_URL + `${id}/getAllProjectsCreatedByUser`, { headers: authHeader() });
}


// Export tất cả
const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  findUserByEmail,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllProjectsCreatedByUser
};

export default userService;