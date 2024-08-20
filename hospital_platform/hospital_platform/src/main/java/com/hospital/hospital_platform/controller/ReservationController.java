package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.JwtTokenProvider;
import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.service.ReservationService;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

//form과 dto의 차이 form은 사용자로부터 데이터 수집 후 서비스 계층에 전달할때 사용
//dto는 서비스 계층에서 처리된 데이터를 커트롤러로 반환하거나 외부시스템으로 데이터 전송때 사용
//병원ID DB확인 후 있으면 가지고 오고 없으면 그냥 진행
@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(
            @Valid @RequestBody ReservationDTO reservationDTO,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        reservationDTO.setUserId(userId);
        ReservationDTO createdReservation = reservationService.reservation(reservationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable Long id,
                                                         @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        Optional<ReservationDTO> reservationDTO = reservationService.findOne(id);
        if (reservationDTO.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservationDTO.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(
            @PathVariable Long id,
            @Valid @RequestBody ReservationDTO reservationDTO,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        reservationDTO.setId(id);
        ReservationDTO updatedReservation = reservationService.updateReservation(reservationDTO);
        return ResponseEntity.ok(updatedReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id,
                                                  @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        try {
            reservationService.cancelReservation(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private Long getUserIdFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        if (!jwtTokenProvider.validateToken(token)) {
            throw new IllegalArgumentException("Invalid or expired JWT token");
        }
        return jwtTokenProvider.getUserIdFromToken(token);
    }
}