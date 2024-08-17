package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.service.ReservationService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

//Model공부중
@Controller
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/reservations")
    public String createReservation(
            @Valid @RequestBody ReservationDTO reservationDTO,
            HttpSession session, Model model) { //@RequestParam = url 상에서 데이터를 찾음 json형식으로 전달되는 데이터는 @RequestBody

        //로그인 상태의 회원 아이디 가져오기
        Long userId = (Long) session.getAttribute("userId");
        
        //로그인 안되어 있으면 로그인페이지로 이동
        if (userId == null) {
            return "redirect:/login";
        }

        //회원 아이디 dto에 저장 후 예약
        reservationDTO.setUserId(userId);
        ReservationDTO createReservation = reservationService.reservation(reservationDTO);

        return "redirect:/reservations";
    }

    @PostMapping("/updateReservations")
    public String updateReservation(
            @Valid @RequestBody ReservationDTO reservationDTO,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/login";
        }

        reservationDTO.setUserId(userId);
//        reservationService.updateReservation();
        return "redirect:/reservations"; //수정필요
    }

//    @PostMapping("/cancelReservations")
//    public String cancelReservation() {
//
//    }


}
