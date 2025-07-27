import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatbotAPI from "./chatbotAPI";
export const sendMessageToAI = createAsyncThunk(
  "chat/sendMessageToAI",
  async (userMessage, thunkAPI) => {
    try {
      const res = await chatbotAPI.sendMessage({ message: userMessage });
      return {
        userMessage,
        reply: res.data.reply,
        mentionedProducts: res.data.mentionedProducts || [],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        id: state.messages.length + 1,
        sender: "user",
        text: action.payload,
       timestamp: Date.now(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          sender: "ai",
          text: action.payload.reply,
          mentionedProducts: action.payload.mentionedProducts,
          timestamp: new Date(),
        });
      })
      .addCase(sendMessageToAI.rejected, (state) => {
        state.loading = false;
        state.messages.push({
          id: state.messages.length + 1,
          sender: "ai",
          text: "Có lỗi xảy ra.",
          timestamp: new Date(),
        });
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
