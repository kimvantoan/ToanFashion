import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";

const cartAPI = {
  getCart: () => axiosClient.get(API_ENDPOINTS.cart.get),
  addToCart: (data) => axiosClient.post(API_ENDPOINTS.cart.add, data),
  updateCartItemQuantity: (id,data) => axiosClient.put(API_ENDPOINTS.cart.update(id), data),
  removeFromCart: (id) => axiosClient.delete(API_ENDPOINTS.cart.remove(id)),
  clearCart: () => axiosClient.delete(API_ENDPOINTS.cart.clear),
};

export default cartAPI;