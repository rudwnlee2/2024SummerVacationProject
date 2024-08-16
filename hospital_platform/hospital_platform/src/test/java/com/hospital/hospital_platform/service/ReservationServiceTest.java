package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.domain.hospital.Hospital;
import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.repository.HospitalRepository;
import com.hospital.hospital_platform.repository.ReservationRepository;
import com.hospital.hospital_platform.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ReservationServiceTest {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    private User user;
    private Hospital hospital;
    private ReservationDTO reservationDTO;

    @BeforeEach
    void setUp() {
        // 테스트 데이터 설정
        user = new User();
        // user 필드 설정
        userRepository.save(user);

        hospital = new Hospital();
        // hospital 필드 설정
        hospitalRepository.save(hospital);

        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);

        reservationDTO = ReservationDTO.builder()
                .userId(user.getId())
                .hospitalId(hospital.getId())
                .reservationDate(reservationDate)
                .build();
    }

    @Test
        // 예약 생성 테스트
    void reservationCreationTest() {
        ReservationDTO createdReservation = reservationService.reservation(reservationDTO);

        assertNotNull(createdReservation);
        assertEquals(user.getId(), createdReservation.getUserId());
        assertEquals(hospital.getId(), createdReservation.getHospitalId());
        assertEquals(reservationDTO.getReservationDate(), createdReservation.getReservationDate());
    }

    @Test
        // 존재하지 않는 사용자로 예약 생성 시 예외 발생 테스트
    void reservationWithNonExistentUserTest() {
        ReservationDTO invalidDTO = ReservationDTO.builder()
                .userId(9999L) // 존재하지 않는 사용자 ID
                .hospitalId(hospital.getId())
                .reservationDate(LocalDateTime.now().plusDays(1))
                .build();

        assertThrows(IllegalArgumentException.class, () -> reservationService.reservation(invalidDTO));
    }

    @Test
        // 존재하지 않는 병원으로 예약 생성 시 예외 발생 테스트
    void reservationWithNonExistentHospitalTest() {
        ReservationDTO invalidDTO = ReservationDTO.builder()
                .userId(user.getId())
                .hospitalId(9999L) // 존재하지 않는 병원 ID
                .reservationDate(LocalDateTime.now().plusDays(1))
                .build();

        assertThrows(IllegalArgumentException.class, () -> reservationService.reservation(invalidDTO));
    }

    @Test
        // 예약 취소 테스트
    void reservationCancellationTest() {
        ReservationDTO createdReservation = reservationService.reservation(reservationDTO);

        reservationService.cancelReservation(createdReservation.getId());

        Optional<ReservationDTO> cancelledReservation = reservationService.findOne(createdReservation.getId());
        assertTrue(cancelledReservation.isEmpty());
    }

    @Test
        // 존재하지 않는 예약 취소 시 예외 발생 테스트
    void cancelNonExistentReservationTest() {
        assertThrows(IllegalArgumentException.class, () -> reservationService.cancelReservation(9999L));
    }

    @Test
        // 예약 날짜 변경 테스트
    void reservationUpdateTest() {
        ReservationDTO createdReservation = reservationService.reservation(reservationDTO);
        LocalDateTime newDate = LocalDateTime.now().plusDays(2);

        ReservationDTO updatedReservation = reservationService.updateReservation(createdReservation.getId(), newDate);

        assertEquals(newDate, updatedReservation.getReservationDate());
    }

    @Test
        // 존재하지 않는 예약 업데이트 시 예외 발생 테스트
    void updateNonExistentReservationTest() {
        LocalDateTime newDate = LocalDateTime.now().plusDays(2);
        assertThrows(IllegalArgumentException.class, () -> reservationService.updateReservation(9999L, newDate));
    }

    @Test
        // 모든 예약 조회 테스트
    void findAllReservationsTest() {
        reservationService.reservation(reservationDTO);

        List<ReservationDTO> reservations = reservationService.findReservation();

        assertFalse(reservations.isEmpty());
    }

    @Test
        // 특정 예약 조회 테스트
    void findOneReservationTest() {
        ReservationDTO createdReservation = reservationService.reservation(reservationDTO);

        Optional<ReservationDTO> foundReservation = reservationService.findOne(createdReservation.getId());

        assertTrue(foundReservation.isPresent());
        assertEquals(createdReservation.getId(), foundReservation.get().getId());
    }
}