import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

const register = (username, email, password) => {
  return axios.post(API_URL + "auth/register", {
    username,
    email,
    password,
  });
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};


const login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;