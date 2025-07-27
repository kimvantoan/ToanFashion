import axiosClient from "../../api/axiosClient";
import API_ENDPOINTS from "../../api/endpoints";

const chatbotAPI = {
  sendMessage: (data) =>
    axiosClient.post(API_ENDPOINTS.chatbot.sendMessage, data),
};
export default chatbotAPI;
