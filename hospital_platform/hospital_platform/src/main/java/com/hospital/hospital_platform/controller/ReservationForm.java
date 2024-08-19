package com.hospital.hospital_platform.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Getter @Setter
public class ReservationForm {

    private Long id;
    private Long userId;
    private Long hospitalId;
    private LocalDateTime reservationDate;
}
