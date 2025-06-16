// frontend/src/api/types.ts

// Base API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// === Auth Types ===
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface AccessTokenResponseDto {
  accessToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// === User Types ===
export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  age: number;
  phoneNumber: string;
  profileImageUrl?: string | null;
  role: "ROLE_USER" | "ROLE_ADMIN";
}

// 기존 호환성을 위한 User 타입 alias
export type User = UserResponse;

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  age: number;
  phoneNumber: string;
  profileImageUrl?: string;
}

export interface ProfileResponse {
  id: number;
  email: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  age: number;
  phoneNumber: string;
  profileImageUrl?: string | null;
  role: "ROLE_USER" | "ROLE_ADMIN";
}

export interface ProfileUpdateRequest {
  nickname?: string;
  gender?: "MALE" | "FEMALE" | "UNKNOWN";
  age?: number;
  profileImageUrl?: string;
}

export interface UserInfoDetailsResponse {
  id: number;
  email: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  age: number;
  phoneNumber: string;
  profileImageUrl?: string | null;
  role: "ROLE_USER" | "ROLE_ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface EmailUpdateRequest {
  newEmail: string;
  currentPassword: string;
}

export interface EmailResponse {
  email: string;
}

export interface PhoneNumberUpdateRequest {
  newPhoneNumber: string;
  currentPassword: string;
}

export interface PhoneNumberResponse {
  phoneNumber: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// === Matching Types ===
export interface MatchRequest {
  groupSize: number;
  region:
    | "SEOUL"
    | "BUSAN"
    | "DAEGU"
    | "INCHEON"
    | "GWANGJU"
    | "DAEJEON"
    | "ULSAN"
    | "GYEONGGI"
    | "GANGWON"
    | "CHUNGBUK"
    | "CHUNGNAM"
    | "JEONBUK"
    | "JEONNAM"
    | "GYEONGBUK"
    | "GYEONGNAM"
    | "JEJU";
  food:
    | "KOREAN"
    | "CHINESE"
    | "JAPANESE"
    | "WESTERN"
    | "FASTFOOD"
    | "CAFE"
    | "MEXICAN"
    | "INDIAN"
    | "THAI"
    | "VIETNAMESE";
}

export interface MatchResponse {
  matchId: number;
  status: "PENDING" | "MATCHED" | "CANCELED";
  createdAt: string;
}

export interface MatchStatus {
  matchId: number;
  status: "PENDING" | "MATCHED" | "CANCELED";
  createdAt: string;
  matchedUserIds?: number[];
}

// === Chat Types ===
export interface ChatMessage {
  id: number;
  roomId: number;
  senderId: number;
  content: string;
  timestamp: string;
  senderNickname: string;
}

export interface ChatMessageRequest {
  content: string;
  senderId: number;
}

export interface ChatRoomResponse {
  id: number;
  name: string;
  participantCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  createdAt: string;
}

export interface ChatRoomParticipant {
  id: number;
  userId: number;
  roomId: number;
  nickname: string;
  joinedAt: string;
}

// === Common Enums ===
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum MatchingStatus {
  WAITING = "WAITING",
  MATCHED = "MATCHED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// === Error Types ===
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}
