package com.example.demo.dto.auth;

import com.example.demo.dto.users.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private String accessToken;
    private String refreshToken;
    private UserResponseDto user;

    public static AuthResponseDto of(String accessToken, String refreshToken, UserResponseDto user) {
        return AuthResponseDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .user(user)
            .build();
    }
}
