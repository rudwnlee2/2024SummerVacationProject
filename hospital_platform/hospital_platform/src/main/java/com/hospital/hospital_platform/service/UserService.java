package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.Address;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 새로운 사용자를 등록하는 메서드입니다.
    public User registerUser(String email, String password, String name,
                             String nickname, String phoneNum, String city, String street, String zipcode) {
        try {
            // 이메일로 중복된 사용자가 있는지 확인합니다.
            if (userRepository.findByEmail(email).isPresent()) {
                throw new IllegalArgumentException("이메일이 이미 존재합니다.");
            }

            // 새로운 사용자 객체를 생성하고, 사용자 정보를 설정합니다.
            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password)); // 비밀번호를 암호화하여 저장합니다.
            user.setName(name);
            user.setNickname(nickname);
            user.setPhoneNum(phoneNum);
            user.setAddress(new Address(city, street, zipcode));
            user.setCreateDate(LocalDateTime.now());
            user.setUpdateDate(LocalDateTime.now());

            // 사용자 정보를 데이터베이스에 저장하고 반환합니다.
            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace(); // 오류를 로그에 출력
            throw new RuntimeException(e.getMessage());
        }
    }

    // 사용자를 인증하는 메서드입니다. 이메일과 비밀번호를 받아 검증합니다.
    public User authenticateUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println("User found: " + user.getEmail());
            // 비밀번호가 일치하는지 확인합니다.
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            } else {
                throw new IllegalArgumentException("이메일 or 비밀번호가 일치하지 않습니다.");
            }
        } else {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
    }

    // 현재 인증된 사용자의 정보를 반환하는 메서드입니다.
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // 인증된 사용자의 ID를 가져옵니다.
        Optional<User> user = userRepository.findById(Long.parseLong(userId));
        return user.orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }
}