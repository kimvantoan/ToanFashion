import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";

const userAPI = {
  login: ({ email, password }) =>
    axiosClient.post(API_ENDPOINTS.auth.login, { email, password }),
  logout: () => axiosClient.post(API_ENDPOINTS.auth.logout),
  loginStatus: () => axiosClient.get(API_ENDPOINTS.auth.loginStatus),
};
export default userAPI;
