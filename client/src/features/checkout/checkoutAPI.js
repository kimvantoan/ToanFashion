import API_ENDPOINTS from "../../api/endpoints";
import axiosClient from "../../api/axiosClient";

const checkoutAPI = {
    get: (data) => axiosClient.post(API_ENDPOINTS.checkout.get,data),
};
export default checkoutAPI;