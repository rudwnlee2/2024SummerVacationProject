package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.domain.hospital.Hospital;
import com.hospital.hospital_platform.domain.User;
import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.repository.HospitalRepository;
import com.hospital.hospital_platform.repository.ReservationRepository;
import com.hospital.hospital_platform.repository.UserRepository;
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
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Test
    void testReservation() {
        // Given
        User user = new User();
        user = userRepository.save(user);

        Long hospitalId = 12345L;  // 예시 병원 ID
        Hospital hospital = Hospital.builder()
                .id(hospitalId)
                .name("Test Hospital")
                .build();
        hospital = hospitalRepository.save(hospital);

        ReservationDTO reservationDTO = ReservationDTO.builder()
                .userId(user.getId())
                .hospitalId(hospital.getId())
                .reservationDate(LocalDateTime.now().plusDays(1))
                .build();

        // When
        ReservationDTO result = reservationService.reservation(reservationDTO);

        // Then
        assertNotNull(result);
        assertNotNull(result.getId());
    }

    @Test
    void testCancelReservation() {
        // Given
        Reservation reservation = createAndSaveReservation();

        // When
        reservationService.cancelReservation(reservation.getId());

        // Then
        Optional<Reservation> cancelledReservation = reservationRepository.findById(reservation.getId());
        assertTrue(cancelledReservation.isEmpty());
    }

    @Test
    void testUpdateReservation() {
        // Given
        Reservation reservation = createAndSaveReservation();
        LocalDateTime newDate = LocalDateTime.now().plusDays(1);

        ReservationDTO updateDTO = ReservationDTO.builder()
                .id(reservation.getId())
                .hospitalId(reservation.getHospital().getId())
                .userId(reservation.getUser().getId())
                .reservationDate(newDate)
                .build();

        // When
        ReservationDTO result = reservationService.updateReservation(updateDTO);

        // Then
        assertEquals(newDate, result.getReservationDate());
    }

    @Test
    void testFindReservation() {
        // Given
        createAndSaveReservation();
        createAndSaveReservation();

        // When
        List<ReservationDTO> result = reservationService.findReservation();

        // Then
        assertTrue(result.size() >= 2);
    }

    @Test
    void testFindReservationsByUserId() {
        // Given
        Reservation reservation = createAndSaveReservation();

        // When
        List<ReservationDTO> result = reservationService.findReservationsByUserId(reservation.getUser().getId());

        // Then
        assertFalse(result.isEmpty());
        assertEquals(reservation.getId(), result.get(0).getId());
    }

    @Test
    void testFindOne() {
        // Given
        Reservation reservation = createAndSaveReservation();

        // When
        Optional<ReservationDTO> result = reservationService.findOne(reservation.getId());

        // Then
        assertTrue(result.isPresent());
        assertEquals(reservation.getId(), result.get().getId());
    }

    @Test
    void testCheckHospitalReservationConflict() {
        // Given
        Reservation reservation = createAndSaveReservation();

        ReservationDTO conflictingDTO = ReservationDTO.builder()
                .hospitalId(reservation.getHospital().getId())
                .userId(reservation.getUser().getId())
                .reservationDate(reservation.getReservationDate())
                .build();

        // When & Then
        assertThrows(IllegalStateException.class, () -> {
            reservationService.reservation(conflictingDTO);
        });
    }

    private Reservation createAndSaveReservation() {
        User user = new User();
        user = userRepository.save(user);

        Long hospitalId = 12345L;  // 예시 병원 ID
        Hospital hospital = Hospital.builder()
                .id(hospitalId)
                .name("Test Hospital")
                .build();
        hospital = hospitalRepository.save(hospital);

        Reservation reservation = Reservation.builder()
                .hospital(hospital)
                .user(user)
                .reservationDate(LocalDateTime.now().plusDays(1))
                .build();

        return reservationRepository.save(reservation);
    }
}
