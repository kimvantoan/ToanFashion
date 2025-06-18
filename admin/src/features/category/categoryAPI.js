import API_ENDPOINTS from '../../api/endpoints';
import axiosClient from '../../api/axiosClient';
const categoryAPI = {
    getCategories: ()=> axiosClient.get(API_ENDPOINTS.category.getAll),
    create: (data) => axiosClient.post(API_ENDPOINTS.category.create, data),
    update: (id, data) => axiosClient.put(API_ENDPOINTS.category.update.replace(':id', id), data),
    delete: (id) => axiosClient.delete(API_ENDPOINTS.category.delete.replace(':id', id)),
}
export default categoryAPI;