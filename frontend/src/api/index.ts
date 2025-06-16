// frontend/src/api/index.ts

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

// Re-export controller classes
export { AuthController, UserController, MatchingController, ChatController };

// === Re-export for convenience ===
export default {
  auth: {
    login: (data: any) => AuthController.login(data),
    logout: (data: any) => AuthController.logout(data),
    refreshToken: (token: string) => AuthController.refreshToken(token),
  },
  user: {
    signup: (data: any) => UserController.signup(data),
    getProfile: () => UserController.getProfile(),
    updateProfile: (data: any) => UserController.updateProfile(data),
    getUserDetails: () => UserController.getUserDetails(),
    updateEmail: (data: any) => UserController.updateEmail(data),
    updatePhoneNumber: (data: any) => UserController.updatePhoneNumber(data),
    changePassword: (data: any) => UserController.changePassword(data),
    withdraw: () => UserController.withdraw(),
  },
  matching: {
    requestMatching: (data: any) => MatchingController.requestMatching(data),
    getMyMatchingStatus: () => MatchingController.getMyMatchingStatus(),
    cancelMatching: (id: number) => MatchingController.cancelMatching(id),
  },
  chat: {
    getChatMessages: (roomId: number) => ChatController.getChatMessages(roomId),
    sendMessage: (roomId: number, data: any) =>
      ChatController.sendMessage(roomId, data),
    getChatRooms: () => ChatController.getChatRooms(),
    getChatRoom: (roomId: number) => ChatController.getChatRoom(roomId),
    getChatRoomParticipants: (roomId: number) =>
      ChatController.getChatRoomParticipants(roomId),
  },
};
