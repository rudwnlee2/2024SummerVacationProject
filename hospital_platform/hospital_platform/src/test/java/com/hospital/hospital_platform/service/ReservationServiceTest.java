package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.controller.ReservationForm;
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
    private ReservationForm reservationForm;

    @BeforeEach
    void setUp() {
        // 테스트용 사용자와 병원 생성
        user = new User();
        user.setName("Test User");
        user = userRepository.save(user);

        hospital = new Hospital();
        hospital.setName("Test Hospital");
        hospital = hospitalRepository.save(hospital);

        LocalDateTime reservationDate = LocalDateTime.now().plusDays(1);

        reservationForm = new ReservationForm();
        reservationForm.setUserId(user.getId());
        reservationForm.setHospitalId(hospital.getId());
        reservationForm.setReservationDate(reservationDate);
    }

    @Test
    void reservation_Success() {
        ReservationDTO result = reservationService.reservation(reservationForm);

        assertNotNull(result);
        assertTrue(reservationRepository.findById(result.getId()).isPresent());
    }

    @Test
    void cancelReservation_Success() {
        ReservationDTO createdReservation = reservationService.reservation(reservationForm);

        reservationService.cancelReservation(createdReservation.getId());

        assertTrue(reservationRepository.findById(createdReservation.getId()).isEmpty());
    }

    @Test
    void updateReservation_Success() {
        ReservationDTO createdReservation = reservationService.reservation(reservationForm);
        LocalDateTime newDate = LocalDateTime.now().plusDays(2);

        ReservationDTO updatedReservation = reservationService.updateReservation(createdReservation.getId(), newDate);

        assertEquals(newDate, updatedReservation.getReservationDate());
        assertEquals(newDate, reservationRepository.findById(createdReservation.getId()).get().getReservationDate());
    }

    @Test
    void findReservation_Success() {
        reservationService.reservation(reservationForm);

        List<ReservationDTO> reservations = reservationService.findReservation();

        assertFalse(reservations.isEmpty());
    }

    @Test
    void findOne_Success() {
        ReservationDTO createdReservation = reservationService.reservation(reservationForm);

        Optional<ReservationDTO> foundReservation = reservationService.findOne(createdReservation.getId());

        assertTrue(foundReservation.isPresent());
        assertEquals(createdReservation.getId(), foundReservation.get().getId());
    }

    @Test
    void reservation_ConflictingReservation() {
        reservationService.reservation(reservationForm);

        assertThrows(IllegalStateException.class, () -> reservationService.reservation(reservationForm));
    }
}