package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.repository.UserRepository;
import com.example.demo.domain.User;
import lombok.extern.slf4j.Slf4j;
import java.util.Optional;
import java.util.List;

/**
 * 시스템 상태 확인을 위한 헬스 체크 컨트롤러
 */
@RestController
@RequestMapping("/api/health")
@Slf4j
public class HealthController {

    @Autowired
    private UserRepository userRepository;

    /**
     * 서버 상태 확인 API
     */
    @GetMapping
    public ResponseEntity<String> healthCheck() {
        log.info("헬스 체크 요청 받음");
        return ResponseEntity.ok("서버가 정상적으로 작동 중입니다. 시간: " + java.time.LocalDateTime.now());
    }

    /**
     * 상세 서버 정보
     */
    @GetMapping("/info")
    public ResponseEntity<Object> serverInfo() {
        log.info("서버 정보 요청 받음");
        
        java.util.Map<String, Object> info = new java.util.HashMap<>();
        info.put("status", "UP");
        info.put("timestamp", java.time.LocalDateTime.now());
        info.put("java_version", System.getProperty("java.version"));
        info.put("spring_profiles", System.getProperty("spring.profiles.active", "default"));
        
        return ResponseEntity.ok(info);
    }

    /**
     * 이메일로 사용자 검색 (디버깅용)
     */
    @GetMapping("/user/{email}")
    public ResponseEntity<Object> findUserByEmail(@PathVariable String email) {
        log.info("사용자 검색 요청: {}", email);
        
        try {
            Optional<User> userOpt = userRepository.findByEmail(email);
            
            java.util.Map<String, Object> result = new java.util.HashMap<>();
            result.put("email", email);
            result.put("found", userOpt.isPresent());
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                result.put("user", java.util.Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "nickname", user.getNickname(),
                    "gender", user.getGender(),
                    "age", user.getAge(),
                    "phoneNumber", user.getPhoneNumber(),
                    "role", user.getRole(),
                    "profileImageUrl", user.getProfileImageUrl() != null ? user.getProfileImageUrl() : "없음"
                ));
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("사용자 검색 중 오류: ", e);
            return ResponseEntity.status(500).body(java.util.Map.of(
                "error", "사용자 검색 중 오류 발생: " + e.getMessage()
            ));
        }
    }

    /**
     * 모든 사용자 목록 조회 (디버깅용)
     */
    @GetMapping("/users")
    public ResponseEntity<Object> getAllUsers() {
        log.info("모든 사용자 목록 요청");
        
        try {
            List<User> users = userRepository.findAll();
            
            java.util.Map<String, Object> result = new java.util.HashMap<>();
            result.put("total", users.size());
            result.put("users", users.stream().map(user -> java.util.Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "nickname", user.getNickname(),
                "gender", user.getGender(),
                "age", user.getAge(),
                "role", user.getRole(),
                "profileImageUrl", user.getProfileImageUrl() != null ? user.getProfileImageUrl() : "없음"
            )).toList());
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("사용자 목록 조회 중 오류: ", e);
            return ResponseEntity.status(500).body(java.util.Map.of(
                "error", "사용자 목록 조회 중 오류 발생: " + e.getMessage()
            ));
        }
    }
} 