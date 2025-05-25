import axios from 'axios';

// Giả sử bạn đã cấu hình base URL cho Axios ở đâu đó rồi.
// Ví dụ: axios.defaults.baseURL = "http://localhost:5000/api/projects";

const uploadFile = async (projectId, formData) => {
  try {
    const response = await axios.post(`/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        projectId // Nếu cần truyền projectId qua query param
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
    throw error;
  }
};

export default {
  uploadFile,
};