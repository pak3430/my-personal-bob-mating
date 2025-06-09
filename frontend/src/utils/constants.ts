// frontend/src/utils/constants.ts
// ERD의 Enum 타입들을 상수로 정의합니다.
export const PREFERRED_GENDERS = ["남성", "여성", "상관 없음"];
export const PREFERRED_FOODS = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "패스트푸드",
  "기타",
];
export const MATCHING_METHODS = ["랜덤 매칭", "선호도 기반 매칭"];
export const MATCHING_STATUSES = [
  "pending",
  "accepted",
  "rejected",
  "completed",
  "cancelled",
];

// 기타 상수
export const API_ROUTES = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  GET_USER_PROFILE: (userId: string) => `/api/users/${userId}/profile`,
  CREATE_MATCHING_REQUEST: "/api/matching/request",
  GET_MATCHING_RESULTS: (userId: string) => `/api/matching/results/${userId}`,
  ACCEPT_MATCHING: (matchId: string) => `/api/matching/accept/${matchId}`,
  REJECT_MATCHING: (matchId: string) => `/api/matching/reject/${matchId}`,
  GET_CHAT_MESSAGES: (roomId: string) => `/api/chat/rooms/${roomId}/messages`,
  SEND_CHAT_MESSAGE: (roomId: string) => `/api/chat/rooms/${roomId}/messages`,
};
