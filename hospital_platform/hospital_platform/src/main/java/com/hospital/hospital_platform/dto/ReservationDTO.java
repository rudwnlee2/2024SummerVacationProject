package com.hospital.hospital_platform.dto;

import com.hospital.hospital_platform.domain.Reservation;
import lombok.*;

import java.time.LocalDateTime;

//Entity와 DTO 분리 이유 : 관심사를 분류하기 위해서 Entity는 db와 비즈니스 개체 DTO는 클라이언트와 데이터 교환
// 이외에도 정보은닉 등등이 있음 좀 더 공부 필요
@Getter
public class ReservationDTO {

    private final Long id;
    private final Long userId;
    private final Long hospitalId;
    private final LocalDateTime reservationDate;

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
}
