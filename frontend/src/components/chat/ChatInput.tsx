// frontend/src/components/chat/ChatInput.tsx
import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-4 border-t border-gray-200 bg-white"
    >
      <InputField
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="flex-1 mr-2"
        label="" // 레이블 숨김
      />
      <Button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        disabled={isLoading}
      >
        전송
      </Button>
    </form>
  );
};

export default ChatInput;
