package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.JwtTokenProvider;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor // 생성자 주입
@RestController // JSON 반환
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입 엔드포인트
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> user) {
        try {
            userService.registerUser(
                    user.get("email"),
                    user.get("password"),
                    user.get("name"),
                    user.get("nickname"),
                    user.get("phoneNum"),
                    user.get("city"),
                    user.get("street"),
                    user.get("zipcode")
            );
            return ResponseEntity.ok("회원가입 되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> user) {
        try {
            System.out.println("Debug Log: 로그인 요청을 받은 이메일 - " + user.get("email"));

            // 사용자 인증
            User authenticatedUser = userService.authenticateUser(user.get("email"), user.get("password"));
            System.out.println("Debug Log: 인증에 성공한 사용자 ID - " + authenticatedUser.getId());

            // JWT 토큰 생성
            String token = jwtTokenProvider.createToken(authenticatedUser.getId());
            System.out.println("Debug Log: JWT 토큰이 생성된 사용자 ID - " + authenticatedUser.getId());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println("Debug Log: 잘못된 자격 증명이 제공된 이메일- " + user.get("email"));

            Map<String, String> response = new HashMap<>();
            response.put("error", "이메일 또는 비밀번호가 잘못되었습니다.");
            return ResponseEntity.status(401).body(response);
        } catch (Exception e) {
            e.printStackTrace();  // 스택 트레이스를 서버 로그에 출력

            Map<String, String> response = new HashMap<>();
            response.put("error", "요청 처리 중 오류가 발생했습니다.");
            return ResponseEntity.status(500).body(response);
        }
    }

    // 사용자 정보 가져오기
    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/myPage")
    public ResponseEntity<?> myPage(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            User myInformation = userService.findOne(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Map<String, Object> response = new HashMap<>();
            response.put("name", myInformation.getName());
            response.put("email", myInformation.getEmail());
            response.put("phoneNumber", myInformation.getPhoneNum());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    private Long getUserIdFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        if (!jwtTokenProvider.validateToken(token)) {
            throw new IllegalArgumentException("Invalid or expired JWT token");
        }
        return jwtTokenProvider.getUserId(token);
    }


}
