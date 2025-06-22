import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";
const categoryAPI = {
  getAll: () => axiosClient.get(API_ENDPOINTS.category.getAll),
  getBySlug: (slug) => axiosClient.get(API_ENDPOINTS.category.getBySlug(slug)),
};
export default categoryAPI;