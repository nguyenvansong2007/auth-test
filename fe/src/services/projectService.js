import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/v1/projects/";

// Tạo instance Axios với base URL và interceptor tự động thêm header
const apiClient = axios.create({
  baseURL: API_URL,
});

// Tự động thêm auth header cho tất cả request
apiClient.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    ...authHeader(),
  };
  return config;
});

// Project CRUD
const getAllProjects = () => apiClient.get("");
const createProject = (data) => apiClient.post("create", data);
const getProjectById = (id) => apiClient.get(id);
const updateProject = (id, data) => apiClient.put(id, data);
const deleteProject = (id) => apiClient.delete(id);
const deleteAllProjects = () => apiClient.delete("");

// Lấy tất cả project của user
const getAllProjectsByUser = (userId) => {
  return apiClient.get(`user/${userId}/getAllProjectsByUser`);
};



// Quản lý thành viên dự án
const addProjectMember = (projectId, memberData) => {
  return apiClient.post(`${projectId}/members`, memberData);
};

const updateProjectMember = (projectId, memberId, role) => {
  return apiClient.put(`${projectId}/members/${memberId}`, { role });
};

const removeProjectMember = (projectId, memberId) => {
  return apiClient.delete(`${projectId}/members/${memberId}`);
};

const getProjectMembers = (projectId) => {
  return apiClient.get(`${projectId}/members`);
};

const projectService = {
  // CRUD Projects
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  deleteAllProjects,
  getAllProjectsByUser,
  

  // Members
  addProjectMember,
  updateProjectMember,
  removeProjectMember,
  getProjectMembers,
};

export default projectService;