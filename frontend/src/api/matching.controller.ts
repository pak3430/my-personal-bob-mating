import { apiClient } from "./client";
import type {
  MatchRequest,
  MatchResponse,
  MatchStatus,
  ApiResponse,
} from "./types";

/**
 * Matching Controller
 * OpenAPI Tag: matching-controller
 */
export class MatchingController {
  /**
   * 매칭 요청 생성
   * POST /api/matchings/wait
   */
  static async requestMatching(
    matchData: MatchRequest
  ): Promise<ApiResponse<MatchResponse>> {
    const response = await apiClient.post("/api/matchings/wait", matchData);
    return response.data;
  }

  /**
   * 내 매칭 상태 조회
   * GET /api/matchings/status
   */
  static async getMyMatchingStatus(): Promise<ApiResponse<MatchStatus>> {
    const response = await apiClient.get("/api/matchings/status");
    return response.data;
  }

  /**
   * 매칭 요청 취소
   * DELETE /api/matchings/{id}
   */
  static async cancelMatching(matchId: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/api/matchings/${matchId}`);
    return response.data;
  }
}

// 기존 함수들과의 호환성을 위한 export
export const requestMatching = MatchingController.requestMatching;
export const getMyMatchingStatus = MatchingController.getMyMatchingStatus;
export const cancelMatching = MatchingController.cancelMatching;

// 기존 함수들과의 호환성을 위한 wrapper 함수들
export const createMatchingRequest = async (matchingData: MatchRequest) => {
  return await apiClient.post("/api/matchings/wait", matchingData);
};

export const getMatchingResults = async () => {
  return await apiClient.get("/api/matchings/status");
};

export const fetchMatchingResults = async (userId: string) => {
  // 사용자별 매칭 결과 조회는 현재 API에 없으므로 전체 상태 조회로 대체
  return await apiClient.get("/api/matchings/status");
};
