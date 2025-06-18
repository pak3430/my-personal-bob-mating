// frontend/src/api/types.ts

// Base API Response wrapper
export interface ApiResponse<T> {
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
}

export interface AccessTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// === User Types ===
export interface UserResponse {
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
  nickname: string;
  profileImageUrl?: string;
}

export interface ProfileUpdateRequest {
  nickname: string;
  profileImageUrl?: string;
}

export interface UserInfoDetailsResponse {
  email: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  age: number;
  phoneNumber: string;
  profileImageUrl?: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
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
  region: Region;
  food: Food;
}

export interface MatchResponse {
  matchId: number;
  status: MatchStatus;
  createdAt: string;
}

export interface MatchStatus {
  matchId: number;
  status: "PENDING" | "MATCHED" | "CANCELED";
  createdAt: string;
  matchedUserIds: number;
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

// === Enums ===
export enum Region {
  SEOUL = "SEOUL",
  BUSAN = "BUSAN",
  DAEGU = "DAEGU",
  INCHEON = "INCHEON",
  GWANGJU = "GWANGJU",
  DAEJEON = "DAEJEON",
  ULSAN = "ULSAN",
  GYEONGGI = "GYEONGGI",
  GANGWON = "GANGWON",
  CHUNGBUK = "CHUNGBUK",
  CHUNGNAM = "CHUNGNAM",
  JEONBUK = "JEONBUK",
  JEONNAM = "JEONNAM",
  GYEONGBUK = "GYEONGBUK",
  GYEONGNAM = "GYEONGNAM",
  JEJU = "JEJU",
}

export enum Food {
  KOREAN = "KOREAN",
  CHINESE = "CHINESE",
  JAPANESE = "JAPANESE",
  WESTERN = "WESTERN",
  FASTFOOD = "FASTFOOD",
  CAFE = "CAFE",
  MEXICAN = "MEXICAN",
  INDIAN = "INDIAN",
  THAI = "THAI",
  VIETNAMESE = "VIETNAMESE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export enum UserRole {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}

// === Error Types ===
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}
