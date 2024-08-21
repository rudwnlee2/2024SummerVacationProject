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
    public String createToken(Long userId) {
        Claims claims = Jwts.claims().setSubject(userId.toString()); // 사용자 ID를 문자열로 변환하여 subject로 설정

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey) // 강력한 비밀키로 서명
                .compact();
    }

    // JWT에서 사용자 ID 추출
    public Long getUserId(String token) {
        String userIdString = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
        return Long.parseLong(userIdString); // 문자열로 된 사용자 ID를 Long 타입으로 변환
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
        Long userId = getUserId(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(userId.toString()); // UserDetailsService를 통해 사용자 로드
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // JWT에서 사용자 ID 추출
    public Long getUserIdFromToken(String token) {
        return getUserId(token); // 토큰에서 사용자 ID 추출
    }
}
