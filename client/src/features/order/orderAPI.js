import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";

const orderAPI = {
  create: (data) => axiosClient.post(API_ENDPOINTS.order.create, data),
  getMyOrders: () => axiosClient.get(API_ENDPOINTS.order.getMyOrders),
  getOrderById: (id) => axiosClient.get(API_ENDPOINTS.order.getOrderById(id)),
};

export default orderAPI;
