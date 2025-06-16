package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 채팅 관련 API를 처리하는 컨트롤러입니다.
 * 채팅방 조회, 메시지 전송/조회, 참가자 관리 기능을 제공합니다.
 */
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "chat-controller", description = "채팅 관련 API")
public class ChatController {

    /**
     * 특정 채팅방의 메시지 목록 조회
     * GET /api/chat/{roomId}/messages
     */
    @GetMapping("/{roomId}/messages")
    @Operation(summary = "채팅방 메시지 조회", description = "특정 채팅방의 메시지 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChatMessages(@PathVariable Long roomId) {
        log.info("채팅방 메시지 조회: roomId = {}", roomId);
        
        // 임시 메시지 데이터
        List<Map<String, Object>> messages = new ArrayList<>();
        Map<String, Object> message1 = new HashMap<>();
        message1.put("id", 1);
        message1.put("roomId", roomId);
        message1.put("senderId", 1);
        message1.put("content", "안녕하세요!");
        message1.put("timestamp", LocalDateTime.now().toString());
        message1.put("senderNickname", "사용자1");
        messages.add(message1);
        
        return ApiResponse.ok("메시지 조회 성공", messages);
    }

    /**
     * 채팅 메시지 전송
     * POST /api/chat/{roomId}/messages
     */
    @PostMapping("/{roomId}/messages")
    @Operation(summary = "채팅 메시지 전송", description = "특정 채팅방에 메시지를 전송합니다.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> sendMessage(
            @PathVariable Long roomId, 
            @RequestBody Map<String, Object> messageRequest) {
        log.info("메시지 전송: roomId = {}, message = {}", roomId, messageRequest);
        
        // 임시 응답 데이터
        Map<String, Object> response = new HashMap<>();
        response.put("id", 1);
        response.put("roomId", roomId);
        response.put("senderId", messageRequest.get("senderId"));
        response.put("content", messageRequest.get("content"));
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("senderNickname", "현재사용자");
        
        return ApiResponse.ok("메시지 전송 성공", response);
    }

    /**
     * 사용자의 채팅방 목록 조회
     * GET /api/chat/rooms
     */
    @GetMapping("/rooms")
    @Operation(summary = "채팅방 목록 조회", description = "현재 사용자가 참여 중인 채팅방 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChatRooms() {
        log.info("채팅방 목록 조회");
        
        // 임시 채팅방 데이터
        List<Map<String, Object>> rooms = new ArrayList<>();
        Map<String, Object> room1 = new HashMap<>();
        room1.put("id", 1);
        room1.put("name", "매칭 채팅방 #1");
        room1.put("participantCount", 4);
        room1.put("lastMessage", "안녕하세요!");
        room1.put("lastMessageTime", LocalDateTime.now().toString());
        room1.put("createdAt", LocalDateTime.now().toString());
        rooms.add(room1);
        
        return ApiResponse.ok("채팅방 목록 조회 성공", rooms);
    }

    /**
     * 특정 채팅방 정보 조회
     * GET /api/chat/rooms/{roomId}
     */
    @GetMapping("/rooms/{roomId}")
    @Operation(summary = "채팅방 정보 조회", description = "특정 채팅방의 상세 정보를 조회합니다.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getChatRoom(@PathVariable Long roomId) {
        log.info("채팅방 정보 조회: roomId = {}", roomId);
        
        // 임시 채팅방 정보
        Map<String, Object> room = new HashMap<>();
        room.put("id", roomId);
        room.put("name", "매칭 채팅방 #" + roomId);
        room.put("participantCount", 4);
        room.put("lastMessage", "안녕하세요!");
        room.put("lastMessageTime", LocalDateTime.now().toString());
        room.put("createdAt", LocalDateTime.now().toString());
        
        return ApiResponse.ok("채팅방 정보 조회 성공", room);
    }

    /**
     * 채팅방 참가자 목록 조회
     * GET /api/chat/{roomId}/participants
     */
    @GetMapping("/{roomId}/participants")
    @Operation(summary = "채팅방 참가자 조회", description = "특정 채팅방의 참가자 목록을 조회합니다.")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChatRoomParticipants(@PathVariable Long roomId) {
        log.info("채팅방 참가자 조회: roomId = {}", roomId);
        
        // 임시 참가자 데이터
        List<Map<String, Object>> participants = new ArrayList<>();
        Map<String, Object> participant1 = new HashMap<>();
        participant1.put("id", 1);
        participant1.put("userId", 1);
        participant1.put("roomId", roomId);
        participant1.put("nickname", "사용자1");
        participant1.put("joinedAt", LocalDateTime.now().toString());
        participants.add(participant1);
        
        return ApiResponse.ok("참가자 목록 조회 성공", participants);
    }
} 