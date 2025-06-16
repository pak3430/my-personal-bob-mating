// frontend/src/pages/MatchingSchedulePage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // useSearchParams 추가
import Button from "../components/common/Button";
import { cancelMatching } from "../api"; // API 함수 임포트

interface MatchDetails {
  id: string;
  partnerName: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  status: "pending" | "accepted" | "rejected";
}

const MatchingSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("matchId"); // URL 쿼리 파라미터에서 matchId 가져오기

  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: 백엔드에서 matchId를 사용하여 상세 정보 로드
    // 실제 백엔드 API 호출로 대체
    if (matchId) {
      setIsLoading(true);
      setError(null);
      // 예시 데이터 (실제는 API 호출)
      const fetchedDetails: MatchDetails = {
        id: matchId,
        partnerName: "김밥친구", // 실제는 API에서 가져옴
        preferredDate: "2025년 6월 10일 (화)",
        preferredTime: "오후 7시",
        location: "강남역 맛집",
        status: "pending",
      };
      setMatchDetails(fetchedDetails);
      setIsLoading(false);
    } else {
      setError("매칭 ID가 없습니다.");
    }
  }, [matchId]);

  const handleAccept = async () => {
    if (matchDetails) {
      // TODO: 매칭 수락 API 호출 구현 필요
      setMatchDetails({ ...matchDetails, status: "accepted" });
      alert("매칭이 수락되었습니다. 채팅방으로 이동합니다.");
      navigate(`/chat/${matchDetails.id}`);
    }
  };

  const handleReject = async () => {
    if (matchDetails) {
      setIsLoading(true);
      setError(null);
      try {
        await cancelMatching(parseInt(matchDetails.id)); // API 호출
        setMatchDetails({ ...matchDetails, status: "rejected" });
        alert("매칭을 거절했습니다.");
        navigate("/mypage");
      } catch (err: any) {
        setError(err.message || "매칭 거절에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        매칭 정보를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!matchDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        매칭 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color-schemes-color-scheme-1-background p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-heading-desktop-h2 mb-6">
          매칭 스케줄 확인
        </h1>
        <p className="text-lg mb-4">
          <span className="font-semibold">{matchDetails.partnerName}</span>
          님과의 매칭이 완료되었습니다!
        </p>
        <div className="text-left mb-6 space-y-2 font-text-regular-normal">
          <p>
            <strong>날짜:</strong> {matchDetails.preferredDate}
          </p>
          <p>
            <strong>시간:</strong> {matchDetails.preferredTime}
          </p>
          <p>
            <strong>장소:</strong> {matchDetails.location}
          </p>
        </div>

        {matchDetails.status === "pending" && (
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={handleAccept}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              disabled={isLoading}
            >
              수락하기
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700"
              disabled={isLoading}
            >
              거절하기
            </Button>
          </div>
        )}

        {matchDetails.status === "accepted" && (
          <p className="text-green-600 font-semibold mt-6">
            매칭이 수락되었습니다. 채팅방에서 대화를 시작하세요!
          </p>
        )}
        {matchDetails.status === "rejected" && (
          <p className="text-red-600 font-semibold mt-6">
            매칭을 거절했습니다.
          </p>
        )}

        <Button
          onClick={() => navigate("/mypage")}
          className="mt-8 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
        >
          마이페이지로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default MatchingSchedulePage;
