import axios, {
  type AxiosInstance,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import type { AuthResponseDto } from "./types";

// API 베이스 URL 설정
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Axios 인스턴스 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10초 타임아웃
});

// 토큰 관련 유틸리티 함수들
export const tokenUtils = {
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};

// Request 인터셉터 - 모든 요청에 Authorization 헤더 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터 - 토큰 갱신 및 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 토큰 만료 에러 (401) 처리
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers._retry
    ) {
      originalRequest.headers._retry = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await apiClient.post<AuthResponseDto>(
          "/api/auth/refresh",
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 새 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 기타 에러 처리
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

// API 헬스 체크 함수
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/health`);
    return response.status === 200;
  } catch {
    return false;
  }
};

// 기본 내보내기
export default apiClient;
