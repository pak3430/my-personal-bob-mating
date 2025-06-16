import { apiClient } from "./client";
import type {
  ChatMessage,
  ChatMessageRequest,
  ChatRoomResponse,
  ChatRoomParticipant,
  ApiResponse,
} from "./types";

/**
 * Chat Controller
 * OpenAPI Tag: chat-controller
 */
export class ChatController {
  /**
   * 특정 채팅방의 메시지 목록 조회
   * GET /api/chat/{roomId}/messages
   */
  static async getChatMessages(
    roomId: number
  ): Promise<ApiResponse<ChatMessage[]>> {
    const response = await apiClient.get(`/api/chat/${roomId}/messages`);
    return response.data;
  }

  /**
   * 채팅 메시지 전송
   * POST /api/chat/{roomId}/messages
   */
  static async sendMessage(
    roomId: number,
    messageData: ChatMessageRequest
  ): Promise<ApiResponse<ChatMessage>> {
    const response = await apiClient.post(
      `/api/chat/${roomId}/messages`,
      messageData
    );
    return response.data;
  }

  /**
   * 사용자의 채팅방 목록 조회
   * GET /api/chat/rooms
   */
  static async getChatRooms(): Promise<ApiResponse<ChatRoomResponse[]>> {
    const response = await apiClient.get("/api/chat/rooms");
    return response.data;
  }

  /**
   * 특정 채팅방 정보 조회
   * GET /api/chat/rooms/{roomId}
   */
  static async getChatRoom(
    roomId: number
  ): Promise<ApiResponse<ChatRoomResponse>> {
    const response = await apiClient.get(`/api/chat/rooms/${roomId}`);
    return response.data;
  }

  /**
   * 채팅방 참가자 목록 조회
   * GET /api/chat/{roomId}/participants
   */
  static async getChatRoomParticipants(
    roomId: number
  ): Promise<ApiResponse<ChatRoomParticipant[]>> {
    const response = await apiClient.get(`/api/chat/${roomId}/participants`);
    return response.data;
  }
}

// 기존 함수들과의 호환성을 위한 export
export const getChatMessages = ChatController.getChatMessages;
export const sendMessage = ChatController.sendMessage;
export const getChatRooms = ChatController.getChatRooms;
export const getChatRoom = ChatController.getChatRoom;
export const getChatRoomParticipants = ChatController.getChatRoomParticipants;

// 기존 함수들과의 호환성을 위한 wrapper 함수들
export const fetchChatHistory = async (roomId: number) => {
  return await apiClient.get(`/api/chat/${roomId}/messages`);
};

export const sendChatMessage = async (
  roomId: number,
  message: string,
  senderId: number
) => {
  return await apiClient.post(`/api/chat/${roomId}/messages`, {
    content: message,
    senderId,
  });
};

export const fetchChatRooms = async () => {
  return await apiClient.get("/api/chat/rooms");
};
