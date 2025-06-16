package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 매칭 관련 API를 처리하는 컨트롤러입니다.
 * 매칭 요청 생성, 매칭 상태 조회, 매칭 요청 취소 기능을 제공합니다.
 */
@RestController
@RequestMapping("/api/matchings")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "matching-controller", description = "매칭 관련 API")
public class MatchingController {

    /**
     * 매칭 요청 생성
     * POST /api/matchings/wait
     */
    @PostMapping("/wait")
    @Operation(summary = "매칭 요청 생성", description = "새로운 매칭 요청을 생성합니다.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> requestMatching(@RequestBody Map<String, Object> matchRequest) {
        log.info("매칭 요청 생성: {}", matchRequest);
        
        // 임시 응답 데이터
        Map<String, Object> response = new HashMap<>();
        response.put("matchId", 1);
        response.put("status", "PENDING");
        response.put("createdAt", LocalDateTime.now().toString());
        
        return ApiResponse.ok("매칭 요청이 생성되었습니다.", response);
    }

    /**
     * 내 매칭 상태 조회
     * GET /api/matchings/status
     */
    @GetMapping("/status")
    @Operation(summary = "내 매칭 상태 조회", description = "현재 사용자의 매칭 상태를 조회합니다.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMyMatchingStatus() {
        log.info("매칭 상태 조회");
        
        // 임시 응답 데이터
        Map<String, Object> response = new HashMap<>();
        response.put("matchId", 1);
        response.put("status", "PENDING");
        response.put("createdAt", LocalDateTime.now().toString());
        response.put("matchedUserIds", new int[]{});
        
        return ApiResponse.ok("매칭 상태 조회 성공", response);
    }

    /**
     * 매칭 요청 취소
     * DELETE /api/matchings/{id}
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "매칭 요청 취소", description = "진행 중인 매칭 요청을 취소합니다.")
    public ResponseEntity<ApiResponse<Void>> cancelMatching(@PathVariable Long id) {
        log.info("매칭 요청 취소: ID = {}", id);
        
        return ApiResponse.ok("매칭 요청이 취소되었습니다.");
    }
} 