package com.example.demo.dto.users;

import com.example.demo.domain.Gender;
import com.example.demo.domain.User;
import com.example.demo.domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private Long id;
    private String email;
    private String nickname;
    private Gender gender;
    private int age;
    private String phoneNumber;
    private String profileImageUrl;
    private UserRole role;

    public static UserResponseDto from(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .phoneNumber(user.getPhoneNumber())
                .profileImageUrl(user.getProfileImageUrl())
                .role(user.getRole())
                .build();
    }
} 