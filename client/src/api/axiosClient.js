import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

axiosClient.interceptors.request.use(
  async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
