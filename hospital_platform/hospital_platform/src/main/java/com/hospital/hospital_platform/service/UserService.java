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

    // 사용자 등록
    public User registerUser(String email, String password, String name,
                             String nickname, String phoneNum, String city, String street, String zipcode) {
        try {
            if (userRepository.findByEmail(email).isPresent()) {
                throw new IllegalArgumentException("이메일이 이미 존재합니다.");
            }

            User user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setName(name);
            user.setNickname(nickname);
            user.setPhoneNum(phoneNum);

            user.setAddress(new Address(city, street, zipcode));
            user.setCreateDate(LocalDateTime.now());
            user.setUpdateDate(LocalDateTime.now());

            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace(); // 오류를 로그에 출력
            throw new RuntimeException(e.getMessage());
        }
    }


    // 사용자 인증
    public User authenticateUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println("User found: " + user.getEmail());
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            } else {
                throw new IllegalArgumentException("이메일 or 비밀번호가 일치하지 않습니다.");
            }
        } else {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
    }
    // 사용자 정보 가져오기
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }
    //사용자 삭제처리


}