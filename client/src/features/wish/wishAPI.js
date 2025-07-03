import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";

const wishAPI = {
  get: () => axiosClient.get(API_ENDPOINTS.wish.get),
  post: (data) => axiosClient.post(API_ENDPOINTS.wish.add, data),
  delete: (id) =>
    axiosClient.delete(API_ENDPOINTS.wish.remove(id)),
};

export default wishAPI;
