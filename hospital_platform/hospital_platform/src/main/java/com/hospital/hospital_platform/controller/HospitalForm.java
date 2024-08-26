package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.domain.Address;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class HospitalForm {

    private Long id;
    private String name;

    private Address address;
    private Integer rating;
    private String hospitalPhoneNum;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
}
