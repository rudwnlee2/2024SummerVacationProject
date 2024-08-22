package com.hospital.hospital_platform;

import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 주어진 사용자 ID를 기반으로 사용자 정보를 로드하는 메서드입니다.
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // 주어진 ID로 사용자를 조회합니다. 사용자 ID는 문자열로 전달됩니다.
        User user = userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + userId));

        // UserDetails 객체를 생성하여 반환합니다.
        return org.springframework.security.core.userdetails.User.withUsername(String.valueOf(user.getId()))
                .password(user.getPassword())
                .authorities("USER")  // 권한을 설정합니다.
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}