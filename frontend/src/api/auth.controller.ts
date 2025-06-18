import { apiClient } from "./client";
import type {
  LoginRequest,
  AuthResponseDto,
  AccessTokenResponseDto,
  LogoutRequest,
  ApiResponse,
} from "./types";

/**
 * Authentication Controller
 * OpenAPI Tag: auth-controller
 */
export class AuthController {
  /**
   * 사용자 로그인
   * POST /api/auth/login
   */
  static async login(
    loginData: LoginRequest
  ): Promise<ApiResponse<AuthResponseDto>> {
    const response = await apiClient.post("/api/auth/login", loginData);
    return response.data;
  }

  /**
   * 사용자 로그아웃
   * POST /api/auth/logout
   */
  static async logout(logoutData: LogoutRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post("/api/auth/logout", logoutData);
    return response.data;
  }

  /**
   * 액세스 토큰 재발급
   * POST /api/auth/refresh
   */
  static async refreshToken(
    refreshToken: string
  ): Promise<ApiResponse<AccessTokenResponseDto>> {
    const response = await apiClient.post("/api/auth/refresh", {
      refreshToken,
    });
    return response.data;
  }
}

// 기존 함수들과의 호환성을 위한 wrapper 함수들
export const loginUser = async (loginData: LoginRequest) => {
  return await AuthController.login(loginData);
};

export const logoutUser = async (refreshToken: string) => {
  return await AuthController.logout({ refreshToken });
};

export const refreshAccessToken = async (refreshToken: string) => {
  return await AuthController.refreshToken(refreshToken);
};
