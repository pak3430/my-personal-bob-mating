import axios, {
  type AxiosInstance,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

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
    const token = tokenUtils.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      {
        headers: config.headers,
        data: config.data,
      }
    );

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response 인터셉터 - 토큰 갱신 및 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status}`, {
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    console.error(`❌ API Error: ${error.response?.status}`, {
      url: error.config?.url,
      message: error.message,
      response: error.response?.data,
    });

    // 401 에러이고 아직 재시도하지 않았다면 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenUtils.getRefreshToken();

      if (refreshToken && !tokenUtils.isTokenExpired(refreshToken)) {
        try {
          console.log("🔄 Attempting token refresh...");

          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh`,
            {
              refreshToken: refreshToken,
            }
          );

          const { accessToken: newAccessToken } = response.data.data;

          // 새 토큰 저장
          tokenUtils.setTokens(newAccessToken, refreshToken);

          // 원래 요청에 새 토큰 적용
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          console.log("✅ Token refreshed successfully");

          // 원래 요청 재시도
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("❌ Token refresh failed:", refreshError);

          // 토큰 갱신 실패 시 로그아웃 처리
          tokenUtils.clearTokens();

          // 로그인 페이지로 리다이렉트
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        }
      } else {
        // Refresh 토큰이 없거나 만료된 경우
        console.log("🚪 No valid refresh token, redirecting to login");
        tokenUtils.clearTokens();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
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
