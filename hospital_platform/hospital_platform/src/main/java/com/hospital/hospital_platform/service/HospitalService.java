package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.controller.HospitalForm;
import com.hospital.hospital_platform.domain.Address;
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

    /**
     * 병원 정보저장
     */
    @Transactional
    public Long saveHospital(Long id, String name, Address address, String hospitalPhoneNum) {
        Hospital hospital = Hospital.builder()
                .id(id)
                .name(name)
                .address(address)
                .hospitalPhoneNum(hospitalPhoneNum)
                .build();
        hospitalRepository.save(hospital);
        return hospital.getId();
    }

    /**
     * 병원ID 체크 메서드
     */
    public boolean checkHospitalID(Long hospitalId){
        Optional<Hospital> hospital = hospitalRepository.findById(hospitalId);

        return hospital.isPresent(); // 값을 가지고 있으면 true 없으면 false
    }

}
