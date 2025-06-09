// frontend/src/api/chat.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const chatApi = axios.create({
  baseURL: `${API_BASE_URL}/api/chat`,
  headers: { "Content-Type": "application/json" },
});

chatApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getChatMessages = async (roomId: string) => {
  const response = await chatApi.get(`/rooms/${roomId}/messages`);
  return response.data;
};

export const sendChatMessage = async (roomId: string, content: string) => {
  const response = await chatApi.post(`/rooms/${roomId}/messages`, { content });
  return response.data;
};

// WebSocket URL (예시)
export const getChatWebSocketUrl = (roomId: string) => {
  // 실제 웹소켓 엔드포인트에 맞게 수정
  // 예: ws://localhost:8080/ws/chat/{roomId}
  return `ws://${window.location.hostname}:8080/ws/chat/${roomId}`;
};
