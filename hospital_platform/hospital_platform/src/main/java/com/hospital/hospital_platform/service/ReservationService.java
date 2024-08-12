package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public List<Reservation> findReservation() { //이것도 Optional로 바꿔야함 아마두? 널 검사
        return reservationRepository.findAll();
    }

    public Reservation findOne(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        return reservation.orElse(null); // Optional에서 값을 추출하여 반환, 없으면 null 반환
    }


}
