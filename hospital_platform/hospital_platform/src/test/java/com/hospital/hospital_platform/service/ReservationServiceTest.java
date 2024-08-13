package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.domain.hospital.Hospital;
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

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ReservationServiceTest {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    private User user;
    private Hospital hospital;

    @BeforeEach
    void setUp() {
        user = new User(); // User 객체 생성 및 필요한 속성 설정
        userRepository.save(user);

        hospital = new Hospital(); // Hospital 객체 생성 및 필요한 속성 설정
        hospitalRepository.save(hospital);
    }

    @Test
    void reservation_성공() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);

        // When
        Long reservationId = reservationService.reservation(user.getId(), hospital.getId(), reservationDate);

        // Then
        assertNotNull(reservationId);
        Reservation savedReservation = reservationRepository.findById(reservationId).orElse(null);
        assertNotNull(savedReservation);
        assertEquals(user.getId(), savedReservation.getUser().getId());
        assertEquals(hospital.getId(), savedReservation.getHospital().getId());
        assertEquals(reservationDate.withSecond(0).withNano(0), savedReservation.getReservationDate().withSecond(0).withNano(0));
    }

    @Test
    void reservation_사용자없음() {
        // Given
        Long nonExistentUserId = 9999L;
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);

        // When & Then
        assertThrows(IllegalArgumentException.class, () ->
                reservationService.reservation(nonExistentUserId, hospital.getId(), reservationDate));
    }

    @Test
    void findReservation_성공() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);
        reservationService.reservation(user.getId(), hospital.getId(), reservationDate);

        // When
        List<Reservation> reservations = reservationService.findReservation();

        // Then
        assertFalse(reservations.isEmpty());
        assertTrue(reservations.stream().anyMatch(r ->
                r.getUser().getId().equals(user.getId()) &&
                        r.getHospital().getId().equals(hospital.getId())));
    }

    @Test
    void findOne_성공() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);
        Long reservationId = reservationService.reservation(user.getId(), hospital.getId(), reservationDate);

        // When
        Reservation foundReservation = reservationService.findOne(reservationId);

        // Then
        assertNotNull(foundReservation);
        assertEquals(user.getId(), foundReservation.getUser().getId());
        assertEquals(hospital.getId(), foundReservation.getHospital().getId());
    }

    @Test
    void findOne_예약없음() {
        // Given
        Long nonExistentReservationId = 9999L;

        // When
        Reservation foundReservation = reservationService.findOne(nonExistentReservationId);

        // Then
        assertNull(foundReservation);
    }
}