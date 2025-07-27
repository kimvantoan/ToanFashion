import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";

const userAPI = {
  login: ({ email, password }) =>
    axiosClient.post(API_ENDPOINTS.auth.login, { email, password }),
  logout: () => axiosClient.post(API_ENDPOINTS.auth.logout),
  loginStatus: () => axiosClient.get(API_ENDPOINTS.auth.loginStatus),
  getAllUsers: () => axiosClient.get(API_ENDPOINTS.auth.allUser),
};
export default userAPI;
