// frontend/src/components/chat/ChatList.tsx
// 이 컴포넌트는 모든 채팅방 목록을 보여줄 때 사용될 수 있습니다.
// 현재 Figma 디자인에는 직접적인 채팅방 목록 UI가 없으므로 스켈레톤만 제공합니다.
import React from "react";
import { Link } from "react-router-dom";

interface ChatRoom {
  id: string;
  name: string; // 채팅방 이름 (예: 상대방 닉네임)
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ChatListProps {
  chatRooms: ChatRoom[];
}

const ChatList: React.FC<ChatListProps> = ({ chatRooms }) => {
  if (chatRooms.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        참여 중인 채팅방이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {chatRooms.map((room) => (
        <Link to={`/chat/${room.id}`} key={room.id} className="block">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-600 truncate">
                {room.lastMessage}
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="text-xs text-gray-500">{room.lastMessageTime}</p>
              {room.unreadCount > 0 && (
                <span className="inline-block bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 mt-1">
                  {room.unreadCount}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
