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

    private User testUser;
    private Hospital testHospital;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setName("Test User");
        userRepository.save(testUser);

        testHospital = new Hospital();
        testHospital.setName("Test Hospital");
        hospitalRepository.save(testHospital);
    }

    @Test
    void reservation_Success() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);

        // When
        Long reservationId = reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate);

        // Then
        assertNotNull(reservationId);
        Reservation savedReservation = reservationRepository.findById(reservationId).orElse(null);
        assertNotNull(savedReservation);
        assertEquals(testUser.getId(), savedReservation.getUser().getId());
        assertEquals(testHospital.getId(), savedReservation.getHospital().getId());
        assertEquals(reservationDate.withSecond(0).withNano(0), savedReservation.getReservationDate().withSecond(0).withNano(0));
    }

    @Test
    void reservation_AlreadyExists() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);
        reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate);

        // When & Then
        assertThrows(IllegalStateException.class, () ->
                reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate)
        );
    }

    @Test
    void cancelReservation() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);
        Long reservationId = reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate);

        // When
        reservationService.cancelReservation(reservationId);

        // Then
        assertNull(reservationRepository.findById(reservationId).orElse(null));
    }

    @Test
    void findReservation() {
        // Given
        LocalDateTime reservationDate1 = LocalDateTime.now().plusDays(1);
        LocalDateTime reservationDate2 = LocalDateTime.now().plusDays(2);
        reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate1);
        reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate2);

        // When
        List<Reservation> reservations = reservationService.findReservation();

        // Then
        assertFalse(reservations.isEmpty());
        assertTrue(reservations.size() >= 2);
    }

    @Test
    void findOne_Exists() {
        // Given
        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);
        Long reservationId = reservationService.reservation(testUser.getId(), testHospital.getId(), reservationDate);

        // When
        Reservation foundReservation = reservationService.findOne(reservationId);

        // Then
        assertNotNull(foundReservation);
        assertEquals(reservationId, foundReservation.getId());
    }

    @Test
    void findOne_NotExists() {
        // Given
        Long nonExistentId = 9999L;

        // When
        Reservation foundReservation = reservationService.findOne(nonExistentId);

        // Then
        assertNull(foundReservation);
    }
}