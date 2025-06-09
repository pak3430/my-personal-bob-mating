// frontend/src/api/auth.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; // 백엔드 포트에 맞게 수정

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (email: string, password: string) => {
  const response = await authApi.post("/login", { email, password });
  return response.data; // 예: { token: '...', user: { ... } }
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  nickname: string;
  phone_num: string;
}) => {
  const response = await authApi.post("/register", userData);
  return response.data;
};
