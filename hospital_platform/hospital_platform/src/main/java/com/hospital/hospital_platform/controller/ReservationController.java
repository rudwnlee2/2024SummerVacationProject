package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.JwtTokenProvider;
import com.hospital.hospital_platform.dto.HospitalDTO;
import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.dto.ReservationRequestDTO;
import com.hospital.hospital_platform.service.HospitalService;
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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final HospitalService hospitalService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(
            @Valid @RequestBody ReservationRequestDTO requestDTO,
            @RequestHeader("Authorization") String token) {

        if (token == null || token.isEmpty()) {
            // 토큰이 없거나 비어있는 경우, 로그인 페이지로 리다이렉트
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .header("Location", "/login")
                    .build();
        }

        ReservationDTO reservationDTO = requestDTO.getReservationDTO();
        HospitalDTO hospitalDTO = requestDTO.getHospitalDTO();

        if (hospitalDTO.getId() == null) {
            throw new IllegalArgumentException("Hospital ID must not be null");
        }

        if (!hospitalService.checkHospitalID(hospitalDTO.getId())) {
            hospitalService.saveHospital(hospitalDTO.getId(), hospitalDTO.getName());
        }

        Long userId = getUserIdFromToken(token);
        if (userId == null) {
            throw new IllegalArgumentException("User ID from token must not be null");
        }
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
        return jwtTokenProvider.getUserId(token);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReservationDTO>> getMyReservations(@RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        List<ReservationDTO> reservations = reservationService.findReservationsByUserId(userId);
        return ResponseEntity.ok(reservations);
    }


}