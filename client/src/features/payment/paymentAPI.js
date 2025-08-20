import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";

const paymentAPI = {
    createVNPAY: (data) => axiosClient.post(API_ENDPOINTS.payment.createVNPAY, data),
     checkVNPAY: (queryString) =>
    axiosClient.get(API_ENDPOINTS.payment.checkVNPAY + queryString),
};

export default paymentAPI;