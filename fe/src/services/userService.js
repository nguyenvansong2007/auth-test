import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/v1/users/";


const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAllUser = () => {
    return axios.get(API_URL + "", { headers: authHeader() });
}

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






export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

