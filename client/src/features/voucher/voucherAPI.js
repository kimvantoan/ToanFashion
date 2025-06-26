import API_ENDPOINTS from "../../api/endpoints";
import axiosClient  from "../../api/axiosClient";

export const voucherAPI = {
  getAll: async () => axiosClient.get(API_ENDPOINTS.voucher.getAll),
};
