// frontend/src/components/matching/MatchingResultCard.tsx
import React from "react";
import Button from "../common/Button";

interface MatchingResultCardProps {
  match: {
    id: string;
    partnerName: string;
    status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
    date?: string;
    location?: string;
    // ERD MatchingResult 필드
  };
  onViewChat?: (matchId: string) => void;
  onViewSchedule?: (matchId: string) => void;
}

const MatchingResultCard: React.FC<MatchingResultCardProps> = ({
  match,
  onViewChat,
  onViewSchedule,
}) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold">{match.partnerName}</h3>
        <p
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            statusColors[match.status]
          }`}
        >
          상태:{" "}
          {match.status === "pending"
            ? "매칭 대기"
            : match.status === "accepted"
            ? "매칭 성공"
            : match.status === "rejected"
            ? "매칭 거절"
            : match.status === "completed"
            ? "매칭 완료"
            : "매칭 취소"}
        </p>
        {match.date && (
          <p className="text-sm text-gray-600">날짜: {match.date}</p>
        )}
        {match.location && (
          <p className="text-sm text-gray-600">장소: {match.location}</p>
        )}
      </div>
      <div className="flex space-x-2">
        {match.status === "accepted" && onViewChat && (
          <Button
            onClick={() => onViewChat(match.id)}
            className="bg-blue-600 text-white text-sm"
          >
            채팅하기
          </Button>
        )}
        {(match.status === "pending" || match.status === "accepted") &&
          onViewSchedule && (
            <Button
              onClick={() => onViewSchedule(match.id)}
              className="bg-gray-500 text-white text-sm"
            >
              스케줄 확인
            </Button>
          )}
      </div>
    </div>
  );
};

export default MatchingResultCard;
