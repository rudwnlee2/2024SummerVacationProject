package com.hospital.hospital_platform.domain;

import com.hospital.hospital_platform.domain.hospital.Hospital;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity //JPA 엔티티 선언
@NoArgsConstructor //빌더랑 같이사용할 수 없음 
//@AllArgsConstructor //빌더를 쓰려면 전체생성자를 만들어야하는데 우리는 아이디가 자동생성이므로 빌더를 따로 빼서 사용
@Getter
//@Setter //getter setter 원래는 setter를 빼야함
public class Reservation {

    @Id //pk
    @Column(name = "reservation_id") //컬럼이름
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long id;

    @ManyToOne(fetch = LAZY) //다대일 매핑 지연로딩(엔티티를 조회할 때, 연관된 엔티티는 실제 사용 시점에 조회)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime reservationDate;

    @Builder
    public Reservation(Hospital hospital, User user, LocalDateTime reservationDate) {
        this.hospital = hospital;
        this.user = user;
        this.reservationDate = reservationDate;
    }

}
