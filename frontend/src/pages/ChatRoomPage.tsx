// frontend/src/pages/ChatRoomPage.tsx
import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import { useParams } from "react-router-dom";
import {
  getChatMessages,
  sendChatMessage,
  getChatWebSocketUrl,
} from "../api/chat";

interface Message {
  id: number;
  sender_id: string; // ERD의 sender_id
  sender_nickname: string; // 표시용 닉네임
  content: string;
  created_at: string; // ERD의 created_at
}

const ChatRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null); // WebSocket 인스턴스 참조

  // TODO: 현재 로그인한 사용자의 ID 또는 닉네임을 가져오는 로직 필요
  const currentUserId = "current_user_id"; // 실제 사용자 ID로 대체
  const currentUserNickname = "나"; // 실제 사용자 닉네임으로 대체

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getChatMessages(roomId);
        setMessages(
          data.map((msg: any) => ({
            ...msg,
            isMyMessage: msg.sender_id === currentUserId, // 내 메시지 여부 판단
          }))
        );
      } catch (err: any) {
        setError(err.message || "메시지를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // WebSocket 연결
    if (roomId) {
      wsRef.current = new WebSocket(getChatWebSocketUrl(roomId));

      wsRef.current.onopen = () => {
        console.log("WebSocket 연결 성공");
      };

      wsRef.current.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...receivedMessage,
            isMyMessage: receivedMessage.sender_id === currentUserId,
          },
        ]);
      };

      wsRef.current.onerror = (err) => {
        console.error("WebSocket 오류:", err);
        setError("채팅 연결에 문제가 발생했습니다.");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket 연결 종료");
      };
    }

    return () => {
      wsRef.current?.close(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
    };
  }, [roomId, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!roomId) return;
    try {
      // API 호출 (데이터베이스 저장)
      await sendChatMessage(roomId, content);

      // WebSocket으로도 메시지 전송 (옵션: 백엔드에서 브로드캐스트하는 경우 이 단계 생략 가능)
      // wsRef.current?.send(JSON.stringify({
      //   roomId,
      //   sender_id: currentUserId,
      //   sender_nickname: currentUserNickname,
      //   content,
      //   created_at: new Date().toISOString(),
      // }));
    } catch (err: any) {
      setError(err.message || "메시지 전송에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-color-schemes-color-scheme-1-background">
      {/* 채팅방 헤더 */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-200">
        <h2 className="text-xl font-semibold">
          채팅방: {roomId || "선택된 채팅방 없음"}
        </h2>
        {/* TODO: 상대방 닉네임 또는 그룹 채팅방 이름 표시 */}
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-600">
            메시지를 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-600">
            아직 메시지가 없습니다. 대화를 시작해보세요!
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              sender={msg.sender_nickname}
              content={msg.content}
              timestamp={new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              isMyMessage={msg.sender_id === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 폼 */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoomPage;
