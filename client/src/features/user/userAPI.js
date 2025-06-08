import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";
const userAPI = {
  login: ({ email, password }) => axiosClient.post(API_ENDPOINTS.auth.login, { email, password }),
  register: (userData) => axiosClient.post(API_ENDPOINTS.auth.register, userData),
  logout: () => axiosClient.post(API_ENDPOINTS.auth.logout),
  loginStatus: () => axiosClient.get(API_ENDPOINTS.auth.loginStatus),
  getProfile: () => axiosClient.get(API_ENDPOINTS.user.profile),
  updateProfile: (data) => axiosClient.put(API_ENDPOINTS.user.updateProfile, data),
};

export default userAPI;
