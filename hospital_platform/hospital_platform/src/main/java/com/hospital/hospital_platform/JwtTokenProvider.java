package com.hospital.hospital_platform;

import com.hospital.hospital_platform.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 강력한 비밀키 생성
    private final long validityInMilliseconds = 3600000; // 1시간 유효 기간

    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // JWT 생성
    public String createToken(String email) {
        Claims claims = Jwts.claims().setSubject(email);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey) // 강력한 비밀키로 서명
                .compact();
    }

    // JWT에서 사용자 이메일 추출
    public String getEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    // JWT 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // HTTP 요청에서 토큰을 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // 토큰을 통해 인증 정보 생성
    public Authentication getAuthentication(String token) {
        String email = getEmail(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // JWT에서 사용자 ID 추출
    public Long getUserIdFromToken(String token) {
        String email = getEmail(token); // 토큰에서 이메일 추출
        UserDetails userDetails = userDetailsService.loadUserByUsername(email); // 이메일로 사용자 정보 조회

        // 사용자 정보에서 ID를 추출합니다. 여기서는 UserDetails의 구현체가 User 클래스로 가정합니다.
        // UserDetails 구현체에 사용자 ID가 포함된 경우를 가정한 예제입니다.
        if (userDetails instanceof User) {
            return ((User) userDetails).getId(); // User 클래스에 getId() 메서드가 있다고 가정합니다.
        } else {
            throw new IllegalArgumentException("User details do not contain user ID");
        }
    }
}