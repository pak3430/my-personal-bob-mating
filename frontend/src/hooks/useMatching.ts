// frontend/src/hooks/useMatching.ts
import { useState, useEffect } from "react";
import {
  createMatchingRequest,
  getMatchingResults,
  requestMatching,
  getMyMatchingStatus,
  cancelMatching,
} from "../api";

export const useMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState<string | null>(null); // 현재 매칭 상태
  const [matchingResults, setMatchingResults] = useState<any[]>([]); // 매칭 결과 목록
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 매칭 상태 조회
  const fetchMatchingStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyMatchingStatus();
      const status = response.data;
      setMatchingResults([status]);
      setMatchingStatus(status.status);
      return status;
    } catch (err: any) {
      setError(err.message || "매칭 상태를 불러오지 못했습니다.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 매칭 요청 생성
  const createMatching = async (requestData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await requestMatching(requestData);
      setMatchingStatus("PENDING"); // 요청 후 상태 업데이트
      return response;
    } catch (err: any) {
      setError(err.message || "매칭 요청에 실패했습니다.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 매칭 요청 취소
  const handleCancelMatching = async (matchId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cancelMatching(matchId);
      setMatchingStatus("CANCELLED");
      // 매칭 결과 상태 업데이트
      setMatchingResults((prev) =>
        prev.map((match) =>
          match.matchId === matchId ? { ...match, status: "CANCELLED" } : match
        )
      );
      return response;
    } catch (err: any) {
      setError(err.message || "매칭 취소에 실패했습니다.");
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
    fetchMatchingStatus,
    createMatching,
    handleCancelMatching,
  };
};
