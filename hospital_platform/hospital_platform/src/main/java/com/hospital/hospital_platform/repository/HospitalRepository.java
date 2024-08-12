package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.hospital.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

}
