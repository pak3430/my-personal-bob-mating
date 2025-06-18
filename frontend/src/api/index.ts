// frontend/src/api/index.ts
import type {
  LoginRequest,
  AuthResponseDto,
  SignupRequest,
  ProfileUpdateRequest,
  EmailUpdateRequest,
  PhoneNumberUpdateRequest,
  ChangePasswordRequest,
  MatchRequest,
  ChatMessageRequest,
} from "./types";

// === API Client ===
export { apiClient, tokenUtils, checkApiHealth } from "./client";

// === Types ===
export type * from "./types";

// === Controller Classes ===
import { AuthController } from "./auth.controller";
import { UserController } from "./user.controller";
import { MatchingController } from "./matching.controller";
import { ChatController } from "./chat.controller";

// === Controllers ===
export * from "./auth.controller";
export * from "./user.controller";
export * from "./matching.controller";
export * from "./chat.controller";
export * from "./types";

// Re-export controller classes
export { AuthController, UserController, MatchingController, ChatController };

// === Re-export for convenience ===
export default {
  auth: {
    login: (data: LoginRequest) => AuthController.login(data),
    logout: (refreshToken: string) => AuthController.logout({ refreshToken }),
    refreshToken: (token: string) => AuthController.refreshToken(token),
  },
  user: {
    signup: (data: SignupRequest) => UserController.signup(data),
    getProfile: () => UserController.getProfile(),
    updateProfile: (data: ProfileUpdateRequest) =>
      UserController.updateProfile(data),
    getUserDetails: () => UserController.getUserDetails(),
    updateEmail: (data: EmailUpdateRequest) => UserController.updateEmail(data),
    updatePhoneNumber: (data: PhoneNumberUpdateRequest) =>
      UserController.updatePhoneNumber(data),
    changePassword: (data: ChangePasswordRequest) =>
      UserController.changePassword(data),
    withdraw: () => UserController.withdraw(),
  },
  matching: {
    requestMatching: (data: MatchRequest) =>
      MatchingController.requestMatching(data),
    getMyMatchingStatus: () => MatchingController.getMyMatchingStatus(),
    cancelMatching: (id: number) => MatchingController.cancelMatching(id),
  },
  chat: {
    getChatMessages: (roomId: number) => ChatController.getChatMessages(roomId),
    sendMessage: (roomId: number, data: ChatMessageRequest) =>
      ChatController.sendMessage(roomId, data),
    getChatRooms: () => ChatController.getChatRooms(),
    getChatRoom: (roomId: number) => ChatController.getChatRoom(roomId),
    getChatRoomParticipants: (roomId: number) =>
      ChatController.getChatRoomParticipants(roomId),
  },
};
