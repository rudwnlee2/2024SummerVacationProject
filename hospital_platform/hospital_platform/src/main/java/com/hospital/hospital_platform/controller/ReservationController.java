package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.dto.ReservationDTO;
import com.hospital.hospital_platform.service.ReservationService;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

//form과 dto의 차이 form은 사용자로부터 데이터 수집 후 서비스 계층에 전달할때 사용
//dto는 서비스 계층에서 처리된 데이터를 커트롤러로 반환하거나 외부시스템으로 데이터 전송때 사용
@Controller
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/reservations")
    public String createReservation(
            @Valid @RequestBody ReservationForm reservationForm,
            HttpSession session, Model model) { //@RequestParam = url 상에서 데이터를 찾음 json형식으로 전달되는 데이터는 @RequestBody

        //로그인 상태의 회원 아이디 가져오기
        Long userId = (Long) session.getAttribute("userId");
        
        //로그인 안되어 있으면 로그인페이지로 이동
        if (userId == null) { return "redirect:/login"; }

        //회원 아이디 dto에 저장 후 예약
        reservationForm.setUserId(userId);
        ReservationDTO createReservation = reservationService.reservation(reservationForm);

        //예약후 알림
        model.addAttribute("reservation", createReservation);
        model.addAttribute("message", "you reservation has been successfully created.");

        return "redirect:/reservations";
    }

//    @GetMapping("/updateForm/{id}")
//    public String updateFoarm(@PathVariable Long id, Model model, HttpSession session {
//
//    }


    @PostMapping("/updateReservations")
    public String updateReservation(
            @Valid @RequestBody ReservationDTO reservationDTO,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/login";
        }

//        reservationDTO.setUserId(userId);
//        reservationService.updateReservation();
        return "redirect:/reservations"; //수정필요
    }

//    @PostMapping("/cancelReservations")
//    public String cancelReservation() {
//
//    }

    //일단 세션으로 진행할지 jwt방식으로 진행할지 결정된 후 계속 진행하는거로


}
