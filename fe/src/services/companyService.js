import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/v1/companies/";

// Tạo instance của axios với cấu hình chung
const apiClient = axios.create({
  baseURL: API_URL,
});

// Thêm header xác thực vào mọi request
apiClient.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    ...authHeader(),
  };
  return config;
});

// Public content (không cần token)
const getPublicContent = () => {
  return axios.get(API_URL + "test/all"); // Ví dụ route public
};

// Các API dành cho authenticated user
const getAllCompanies = () => {
  return apiClient.get(""); // GET /api/v1/companies/
};

const getCompanyById = (id) => {
  return apiClient.get(id); // GET /api/v1/companies/{id}
};

const createCompany = (data) => {
  return apiClient.post("create", data); // POST /api/v1/companies/create
};

const updateCompany = (id, data) => {
  return apiClient.put(id, data); // PUT /api/v1/companies/{id}
};

const deleteCompany = (id) => {
  return apiClient.delete(id); // DELETE /api/v1/companies/{id}
};

// Xuất tất cả các hàm
export default {
  getPublicContent,
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};