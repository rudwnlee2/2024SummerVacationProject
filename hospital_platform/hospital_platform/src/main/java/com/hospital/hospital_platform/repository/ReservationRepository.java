package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
