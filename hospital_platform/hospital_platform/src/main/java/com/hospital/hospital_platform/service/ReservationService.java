package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.domain.hospital.Hospital;
import com.hospital.hospital_platform.repository.HospitalRepository;
import com.hospital.hospital_platform.repository.ReservationRepository;
import com.hospital.hospital_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;

    /**
     * 예약
     */
    @Transactional
    public Long reservation(Long userId, Long hospitalId, LocalDateTime reservationDate) {

        // 엔티티 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found"));

        // 예약날짜 생성
        LocalDateTime day = LocalDateTime.of(reservationDate.getYear(), reservationDate.getMonth(),
                reservationDate.getDayOfMonth(), reservationDate.getHour(), reservationDate.getMinute());

        // 예약 시간 중복 체크
        List<Reservation> existingReservations = reservationRepository.findByHospitalIdAndReservationDate(hospitalId, day);

        if (!existingReservations.isEmpty()) {
            throw new IllegalStateException("이미 예약된 시간입니다.");
        }

        // 예약생성
        Reservation reservation = Reservation.builder()
                .hospital(hospital)
                .user(user)
                .reservationDate(day)
                .build();

        //예약 저장
        reservationRepository.save(reservation);
        return reservation.getId();
    }

    /**
     *예약취소
     */
    @Transactional
    public void cancelReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public List<Reservation> findReservation() {
        return reservationRepository.findAll();
    }

    public Reservation findOne(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        return reservation.orElse(null); // Optional에서 값을 추출하여 반환, 없으면 null 반환
    }


}
