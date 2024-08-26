package com.hospital.hospital_platform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class ReservationRequestDTO {

    private ReservationDTO reservationDTO;
    private HospitalDTO hospitalDTO;

    // 기본 생성자에서 초기화
    public ReservationRequestDTO() {
        this.reservationDTO = new ReservationDTO();
        this.hospitalDTO = new HospitalDTO();
    }

    public void setReservationDTO(ReservationDTO reservationDTO) {
        if (reservationDTO == null) {
            throw new IllegalArgumentException("ReservationDTO cannot be null");
        }
        this.reservationDTO = reservationDTO;
    }

    public void setHospitalDTO(HospitalDTO hospitalDTO) {
        if (hospitalDTO == null) {
            throw new IllegalArgumentException("HospitalDTO cannot be null");
        }
        this.hospitalDTO = hospitalDTO;
    }

}
