import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";

const orderAPI = {
  getOrders: () => axiosClient.get(API_ENDPOINTS.order.getAll),
  getOrder: (id) =>
    axiosClient.get(`${API_ENDPOINTS.order.getOrderById.replace(":id", id)}`),

  updateDeliveryStatus: ({id, status}) =>
    axiosClient.put(
      `${API_ENDPOINTS.order.updateDeliveryStatus.replace(":id", id)}`,
      { status }
    ),
};

export default orderAPI;
