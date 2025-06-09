// frontend/src/components/chat/ChatMessage.tsx
import React from "react";

interface ChatMessageProps {
  sender: string;
  content: string;
  timestamp: string;
  isMyMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  content,
  timestamp,
  isMyMessage,
}) => {
  return (
    <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg shadow-sm 
          ${
            isMyMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
      >
        {!isMyMessage && <p className="font-bold text-sm mb-1">{sender}</p>}
        <p className="text-sm">{content}</p>
        <span className="block text-right text-xs mt-1 opacity-75">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
