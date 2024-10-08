package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.controller.ReservationForm;
import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.domain.hospital.Hospital;
import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.repository.HospitalRepository;
import com.hospital.hospital_platform.repository.ReservationRepository;
import com.hospital.hospital_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;

    /**
     * 예약
     */
    @Transactional
    public ReservationDTO reservation(ReservationDTO reservationDTO) {

        // 엔티티 조회
        User user = userRepository.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Hospital hospital = hospitalRepository.findById(reservationDTO.getHospitalId())
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found"));

        // 예약 시간 중복 체크 //동시성 문제가 생길 수 있음(나중에 시간되면 고쳐보도록(중복 체크와 예약 생성 논리를 데이터베이스 레벨에서 처리하는 것이 안전) 예) 낙관적 락
        checkHospitalReservationConflict(hospital.getId(), reservationDTO.getReservationDate());

        // 예약생성
        Reservation reservation = Reservation.builder()
                .hospital(hospital)
                .user(user)
                .reservationDate(reservationDTO.getReservationDate())
                .build();

        //예약 저장
        reservationRepository.save(reservation);
        return ReservationDTO.fromEntity(reservation);
    }

    /**
     *예약취소
     */
    @Transactional
    public void cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        reservationRepository.delete(reservation);
    }

    /**
     * 예약변경
     */
    @Transactional
    public ReservationDTO updateReservation(ReservationDTO reservationDTO) {
        logger.info("Updating reservation. DTO: {}", reservationDTO);

        if (reservationDTO.getId() == null) {
            logger.error("Reservation ID is null");
            throw new IllegalArgumentException("Reservation ID must not be null");
        }

        Reservation reservation = reservationRepository.findById(reservationDTO.getId())
                .orElseThrow(() -> {
                    logger.error("Reservation not found with ID: {}", reservationDTO.getId());
                    return new IllegalArgumentException("Reservation not found");
                });

        //reservation 여기서 병원엔티티를 가지고 와서 아이디를 조회
        // 예약에서 병원 ID를 가져옵니다.
        Long hospitalId = reservation.getHospital().getId();
        logger.info("Retrieved hospital ID: {} from reservation", hospitalId);

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> {
                    logger.error("Hospital not found with ID: {}", hospitalId);
                    return new IllegalArgumentException("Hospital not found");
                });

        logger.info("Checking for reservation conflicts...");
        checkHospitalReservationConflict(hospital.getId(), reservationDTO.getReservationDate());

        logger.info("Updating reservation...");
        reservation.updateReservation(reservationDTO.getReservationDate());

        logger.info("Reservation updated successfully. Updated reservation: {}", reservation);
        return ReservationDTO.fromEntity(reservation);
    }

    //대규모로 바뀔시 페이징처리 하는것이 좋음 성능이슈
    public List<ReservationDTO> findReservation() {
        return reservationRepository.findAll().stream()
                .map(ReservationDTO::fromEntity)  // 각 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }

    /**
     * 유저가 예약한 정보들
     */
    public List<ReservationDTO> findReservationsByUserId(Long userId) {
        List<Reservation> reservations = reservationRepository.findAllByUserId(userId);
        return reservations.stream()
                .map(ReservationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<ReservationDTO> findOne(Long reservationId) {
        return reservationRepository.findById(reservationId)
                .map(ReservationDTO::fromEntity);  // 엔티티를 DTO로 변환
    }




    /**
     * 병원예약 중복체크 메서드
     */
    private void checkHospitalReservationConflict(Long hospitalId, LocalDateTime reservationDate) {
        List<Reservation> hospitalReservations = reservationRepository.findByHospitalIdAndReservationDate(hospitalId, reservationDate);
        if (!hospitalReservations.isEmpty()) {
            throw new IllegalStateException("해당 병원에 해당 시간에 이미 다른 예약이 있습니다.");
        }
    }

}
