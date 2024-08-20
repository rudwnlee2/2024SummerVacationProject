package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.controller.HospitalForm;
import com.hospital.hospital_platform.domain.hospital.Hospital;
import com.hospital.hospital_platform.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HospitalService {

    private final HospitalRepository hospitalRepository;

//    @Transactional
//    public Long saveHospital()

    /**
     * 병원ID 체크 메서드
     */
    public void checkHospitalID(Long hospitalId){
        Optional<Hospital> hospital = hospitalRepository.findById(hospitalId);
        if (hospital.isPresent()) {

        }
    }

}
