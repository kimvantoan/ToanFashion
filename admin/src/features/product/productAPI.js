import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";
const productAPI = {
  getAll: () => axiosClient.get(API_ENDPOINTS.product.getAll),
  getById: (id) =>
    axiosClient.get(API_ENDPOINTS.product.getById.replace(":id", id)),
  
  create: (data) => axiosClient.post(API_ENDPOINTS.product.create, data),

  update: (id, data) =>
    axiosClient.put(API_ENDPOINTS.product.update.replace(":id", id), data),

  delete: (id) =>
    axiosClient.delete(API_ENDPOINTS.product.delete.replace(":id", id)),
};

export default productAPI;
