package com.hospital.hospital_platform.dto;

import com.hospital.hospital_platform.domain.Reservation;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
public class ReservationDTO {

    private Long id;
    private Long userId;
    private Long hospitalId;
    private LocalDateTime reservationDate;

    @Builder
    private ReservationDTO(Long id, Long userId, Long hospitalId, LocalDateTime reservationDate) {
        this.id = id;
        this.userId = userId;
        this.hospitalId = hospitalId;
        this.reservationDate = reservationDate;
    }

    public static ReservationDTO fromEntity(Reservation reservation) {
        return ReservationDTO.builder()
                .id(reservation.getId())
                .userId(reservation.getUser().getId())
                .hospitalId(reservation.getHospital().getId())
                .reservationDate(reservation.getReservationDate())
                .build();
    }

    // 기본 생성자 추가 (필요시)
    public ReservationDTO() {
    }
}
