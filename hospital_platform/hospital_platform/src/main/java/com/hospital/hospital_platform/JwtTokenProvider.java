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

    // JWT 서명을 위한 비밀 키를 생성합니다. 여기서는 HS256 알고리즘을 사용합니다.
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // JWT 토큰의 유효 기간을 1시간(3600000ms)으로 설정합니다.
    private final long validityInMilliseconds = 3600000;

    private final UserDetailsService userDetailsService;

    // 의존성 주입을 통해 UserDetailsService를 받습니다.
    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // JWT 토큰을 생성하는 메서드입니다. 사용자 ID를 인자로 받습니다.
    public String createToken(Long userId) {
        // 토큰의 'subject' 클레임에 사용자 ID를 설정합니다.
        Claims claims = Jwts.claims().setSubject(String.valueOf(userId));

        // 현재 시간과 토큰의 만료 시간을 설정합니다.
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        // JWT 토큰을 생성하고 서명한 후 반환합니다.
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey) // 비밀 키를 사용해 토큰에 서명합니다.
                .compact();
    }

    // JWT 토큰에서 사용자 ID를 추출하는 메서드입니다.
    public Long getUserId(String token) {
        // 토큰의 'subject' 클레임을 사용자 ID로 간주하고 이를 Long 타입으로 반환합니다.
        return Long.parseLong(Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject());
    }

    // JWT 토큰의 유효성을 검증하는 메서드입니다.
    public boolean validateToken(String token) {
        try {
            // 비밀 키를 사용해 토큰을 파싱하여 유효성을 확인합니다.
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true; // 토큰이 유효한 경우 true를 반환합니다.
        } catch (Exception e) {
            // 토큰이 유효하지 않은 경우 예외가 발생하며, false를 반환합니다.
            return false;
        }
    }

    // HTTP 요청에서 Authorization 헤더를 통해 JWT 토큰을 추출하는 메서드입니다.
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // Authorization 헤더가 'Bearer '로 시작하는 경우 토큰만 추출합니다.
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // JWT 토큰을 통해 사용자를 인증하는 메서드입니다.
    public Authentication getAuthentication(String token) {
        Long userId = getUserId(token); // 토큰에서 사용자 ID를 추출합니다.
        UserDetails userDetails = userDetailsService.loadUserByUsername(String.valueOf(userId)); // 사용자 ID로 UserDetails를 가져옵니다.
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}
