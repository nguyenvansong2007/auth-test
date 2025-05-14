import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/api/v1/projects/";

// Project CRUD operations
const getAllProjects = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createProject = (data) => {
  return axios.post(API_URL + "create", data, { headers: authHeader() });
};

const getProjectById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const updateProject = (id, data) => {
  return axios.put(API_URL + id, data, { headers: authHeader() });
};

const deleteProject = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const deleteAllProjects = () => {
  return axios.delete(API_URL, { headers: authHeader() });
};

// Project member operations
const addProjectMember = (projectId, memberData) => {
  return axios.post(API_URL + projectId + "/add-member", memberData, { headers: authHeader() });
};

const updateProjectMember = (projectId, memberData) => {
  return axios.post(API_URL + projectId + "/update-member", memberData, { headers: authHeader() });
};

const removeProjectMember = (projectId, memberData) => {
  return axios.post(API_URL + projectId + "/remove-member", memberData, { headers: authHeader() });
};

const getProjectMembers = (projectId) => {
  return axios.get(API_URL + projectId + "/getAllMember", { headers: authHeader() });
};

export default {
  // Project CRUD
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  deleteAllProjects,

  // Project member operations
  addProjectMember,
  updateProjectMember,
  removeProjectMember,
  getProjectMembers,
};
