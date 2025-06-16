package com.example.demo.dto.auth;

import com.example.demo.domain.Gender;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String nickname;
    private String phone_num;
    private Gender gender;
    private int age;
} 