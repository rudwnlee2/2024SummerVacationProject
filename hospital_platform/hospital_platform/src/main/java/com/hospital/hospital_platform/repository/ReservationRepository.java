package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * 시간 중복 체크를 위해 예약 목록을 반환
     */
    @Query("SELECT r FROM Reservation r WHERE r.hospital.id = :hospitalId AND r.reservationDate = :reservationDate")
    List<Reservation> findByHospitalIdAndReservationDate(@Param("hospitalId") Long hospitalId, @Param("reservationDate") LocalDateTime reservationDate);

    /**
     * userId로 예약한 정보를 모두 가지고 올때 사용 List로 받아와야되서 이렇게 정의후 서비스계층에서 사용 
     */
    List<Reservation> findAllByUserId(Long userId);
}
