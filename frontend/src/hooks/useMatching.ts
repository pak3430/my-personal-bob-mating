// frontend/src/hooks/useMatching.ts
import { useState, useEffect } from "react";
import {
  createMatchingRequest,
  getMatchingResults,
  acceptMatching,
  rejectMatching,
} from "../api/matching";

export const useMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState<string | null>(null); // 현재 매칭 상태
  const [matchingResults, setMatchingResults] = useState<any[]>([]); // 매칭 결과 목록
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 사용자의 매칭 결과 로드 (MyPage 등에서 사용)
  const fetchMatchingResults = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getMatchingResults(userId);
      setMatchingResults(results);
      return results;
    } catch (err: any) {
      setError(err.message || "매칭 결과를 불러오지 못했습니다.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 매칭 요청 생성
  const requestMatching = async (requestData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createMatchingRequest(requestData);
      setMatchingStatus("pending"); // 요청 후 상태 업데이트
      return response;
    } catch (err: any) {
      setError(err.message || "매칭 요청에 실패했습니다.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 매칭 수락
  const handleAcceptMatching = async (matchId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await acceptMatching(matchId);
      // 매칭 결과 상태 업데이트 (선택적)
      setMatchingResults((prev) =>
        prev.map((match) =>
          match.id === matchId ? { ...match, status: "accepted" } : match
        )
      );
      return response;
    } catch (err: any) {
      setError(err.message || "매칭 수락에 실패했습니다.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 매칭 거절
  const handleRejectMatching = async (matchId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await rejectMatching(matchId);
      // 매칭 결과 상태 업데이트 (선택적)
      setMatchingResults((prev) =>
        prev.map((match) =>
          match.id === matchId ? { ...match, status: "rejected" } : match
        )
      );
      return response;
    } catch (err: any) {
      setError(err.message || "매칭 거절에 실패했습니다.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    matchingStatus,
    matchingResults,
    isLoading,
    error,
    fetchMatchingResults,
    requestMatching,
    handleAcceptMatching,
    handleRejectMatching,
  };
};
