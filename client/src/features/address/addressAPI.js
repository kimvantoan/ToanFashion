import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";

const addressAPI = {
  getAddresses: async () => axiosClient.get(API_ENDPOINTS.address.getAll),
  createAddress: async (address) =>
    axiosClient.post(API_ENDPOINTS.address.create, address),
  updateAddress: async (id, address) =>
    axiosClient.put(API_ENDPOINTS.address.update(id), address),
  deleteAddress: async (id) =>
    axiosClient.delete(API_ENDPOINTS.address.delete(id)),
};

export default addressAPI;
