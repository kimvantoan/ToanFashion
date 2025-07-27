import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";

const chartAPI = {
  getMonthlyRevenue: () =>
    axiosClient.get(API_ENDPOINTS.chart.getMonthlyRevenue),
  getOrderStatusStats: () =>
    axiosClient.get(API_ENDPOINTS.chart.getOrderStatusStats),
  getDailyOrderStats: () =>
    axiosClient.get(API_ENDPOINTS.chart.getDailyOrderStats),
  getProductCategoryRatio: () =>
    axiosClient.get(API_ENDPOINTS.chart.getProductCategoryRatio),
};

export default chartAPI;