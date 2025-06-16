import { apiClient } from "./client";
import type {
  SignupRequest,
  ProfileResponse,
  ProfileUpdateRequest,
  UserInfoDetailsResponse,
  EmailUpdateRequest,
  EmailResponse,
  PhoneNumberUpdateRequest,
  PhoneNumberResponse,
  ChangePasswordRequest,
  ApiResponse,
} from "./types";

/**
 * User Controller
 * OpenAPI Tag: user-controller
 */
export class UserController {
  /**
   * 사용자 회원가입
   * POST /api/user/signup
   */
  static async signup(signupData: SignupRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post("/api/user/signup", signupData);
    return response.data;
  }

  /**
   * 회원 프로필 조회
   * GET /api/user/profile
   */
  static async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.get("/api/user/profile");
    return response.data;
  }

  /**
   * 회원 프로필 수정
   * PUT /api/user/profile
   */
  static async updateProfile(
    profileData: ProfileUpdateRequest
  ): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.put("/api/user/profile", profileData);
    return response.data;
  }

  /**
   * 사용자 상세 정보 조회
   * GET /api/user/me/details
   */
  static async getUserDetails(): Promise<ApiResponse<UserInfoDetailsResponse>> {
    const response = await apiClient.get("/api/user/me/details");
    return response.data;
  }

  /**
   * 사용자 이메일 변경
   * PUT /api/user/email
   */
  static async updateEmail(
    emailData: EmailUpdateRequest
  ): Promise<ApiResponse<EmailResponse>> {
    const response = await apiClient.put("/api/user/email", emailData);
    return response.data;
  }

  /**
   * 사용자 전화번호 변경
   * PUT /api/user/phone-number
   */
  static async updatePhoneNumber(
    phoneData: PhoneNumberUpdateRequest
  ): Promise<ApiResponse<PhoneNumberResponse>> {
    const response = await apiClient.put("/api/user/phone-number", phoneData);
    return response.data;
  }

  /**
   * 사용자 비밀번호 변경
   * PUT /api/user/password
   */
  static async changePassword(
    passwordData: ChangePasswordRequest
  ): Promise<ApiResponse<void>> {
    const response = await apiClient.put("/api/user/password", passwordData);
    return response.data;
  }

  /**
   * 회원 탈퇴
   * DELETE /api/user/withdraw
   */
  static async withdraw(): Promise<ApiResponse<void>> {
    const response = await apiClient.delete("/api/user/withdraw");
    return response.data;
  }
}

// 기존 함수들과의 호환성을 위한 export
export const signup = UserController.signup;
export const getProfile = UserController.getProfile;
export const updateProfile = UserController.updateProfile;
export const getUserDetails = UserController.getUserDetails;
export const updateEmail = UserController.updateEmail;
export const updatePhoneNumber = UserController.updatePhoneNumber;
export const changePassword = UserController.changePassword;
export const withdraw = UserController.withdraw;

// 기존 함수들과의 호환성을 위한 wrapper 함수들
export const registerUser = async (userData: SignupRequest) => {
  return await apiClient.post("/api/user/signup", userData);
};

export const fetchUsers = async () => {
  return await apiClient.get("/api/user/me/details");
};
