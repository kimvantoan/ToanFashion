import axiosClient from "../../api/axiosClient";
import  API_ENDPOINTS  from "../../api/endpoints";

const productAPI = {
    getAll: (params) => axiosClient.get(API_ENDPOINTS.product.getAll, { params }),
    getNewProducts: () => axiosClient.get(API_ENDPOINTS.product.getNewProducts),
    getBySlug: (slug) => axiosClient.get(API_ENDPOINTS.product.getProductBySlug(slug)),
    getByCategory: (categorySlug) => axiosClient.get(API_ENDPOINTS.product.getProductsByCategory(categorySlug)),
}

export default productAPI;