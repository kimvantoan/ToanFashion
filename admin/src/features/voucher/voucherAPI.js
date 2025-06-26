import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";

const voucherAPI = {
  getAll: () => axiosClient.get(API_ENDPOINTS.voucher.getAll),
  getDetail: (id) => axiosClient.get(API_ENDPOINTS.voucher.getById.replace(':id', id)),
  create: (data) => axiosClient.post(API_ENDPOINTS.voucher.create, data),
  update: (id, data) => axiosClient.put(API_ENDPOINTS.voucher.update.replace(':id', id), data),
  delete: (id) => axiosClient.delete(API_ENDPOINTS.voucher.delete.replace(':id', id)),
};

export default voucherAPI;