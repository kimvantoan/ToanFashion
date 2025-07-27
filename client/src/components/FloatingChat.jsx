import { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendMessageToAI, addUserMessage } from "../features/chatbot/chatbotSlice";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chatbot);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    dispatch(addUserMessage(inputMessage));
    dispatch(sendMessageToAI(inputMessage));
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button - Cố định trên màn hình, không phụ thuộc vào scroll */}
      <Fab
        color="error"
        aria-label="chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] shadow-lg hover:shadow-xl duration-300 "
        sx={{
          backgroundColor: "#c9184a",
          position: "fixed !important",
          bottom: "24px !important",
          right: "24px !important",
          zIndex: 9999,
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Dialog - Cũng cố định trên màn hình */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            position: "fixed !important",
            bottom: "90px !important", // Cách button một khoảng
            right: "24px !important",
            top: "auto !important",
            left: "auto !important",
            margin: 0,
            maxWidth: "384px",
            width: "384px",
            height: "550px",
            borderRadius: "12px",
            zIndex: 9998,
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "transparent", // Loại bỏ backdrop để không che màn hình
          },
        }}
      >
        {/* Header */}
        <DialogTitle className="bg-[#c9184a] text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChatIcon />
            <Typography variant="h6" className="font-medium">
              Hỗ trợ AI
            </Typography>
          </div>
          <IconButton
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-700 p-1"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Chat Messages */}
        <DialogContent className="p-0 flex flex-col h-full">
          <Box className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column", // Đảm bảo sản phẩm nằm dưới
                    alignItems: message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Paper
                    sx={{
                      backgroundColor:
                        message.sender === "user"
                          ? "#fff"
                          : message.sender === "ai"
                          ? "#42a5f5"
                          : "#fff",
                      color: message.sender === "user" ? "#333" : "#fff",
                      maxWidth: "80%",
                      marginLeft: message.sender === "ai" ? 0 : "auto",
                      marginRight: message.sender === "user" ? 0 : "auto",
                    }}
                    elevation={1}
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : message.sender === "ai"
                        ? "bg-blue-400 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <Typography variant="body2" className="break-words">
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={`block mt-1 text-xs ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : message.sender === "ai"
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp &&
                        new Date(message.timestamp).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </Typography>
                  </Paper>
                  {/* Hiển thị sản phẩm bên dưới đoạn chat AI */}
                  {message.sender === "ai" &&
                    message.mentionedProducts &&
                    message.mentionedProducts.length > 0 && (
                      <Box className="mt-2 space-y-2 w-full">
                        {message.mentionedProducts.map((product) => (
                          <Paper
                            key={product._id}
                            elevation={2}
                            className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition"
                            onClick={() => navigate(`/product/${product.slug}`)}
                            sx={{ marginLeft: 0 }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: 8,
                                objectFit: "cover",
                                marginRight: 12,
                              }}
                            />
                            <div>
                              <Typography variant="subtitle2" className="font-bold">
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {product.price.toLocaleString("vi-VN")} VNĐ
                              </Typography>
                            </div>
                          </Paper>
                        ))}
                      </Box>
                    )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <CircularProgress size={20} />
                <span className="ml-2 text-gray-500 text-sm">
                  AI đang trả lời...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập tin nhắn của bạn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
                multiline
                maxRows={3}
                className="flex-1"
                disabled={loading}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || loading}
                className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
                size="small"
              >
                <SendIcon />
              </IconButton>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
