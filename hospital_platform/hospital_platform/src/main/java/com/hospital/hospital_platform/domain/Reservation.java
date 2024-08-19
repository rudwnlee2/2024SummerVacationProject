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
        validateReservationDate(reservationDate);

        this.hospital = hospital;
        this.user = user;
        this.reservationDate = reservationDate;
    }

    //== 비즈니스 로직==//

    /**
     * 예약 변경
     */
    public void updateReservation(LocalDateTime updateDate) {
        validateReservationDate(updateDate);
        this.reservationDate = updateDate;
    }

    //원래 이거는 form객체에서 입력받을때 검사하는게 더 좋다고 생각 @Future으로 여기서의 비즈니스 로직은 가지고 오는 데이터들의 유효성 검사를 하는게 맞다고 생각
    //추가로 엔티티 비즈니스로직에는 간단한 비즈니스 로직을 주로 만드는 것이 바람직함 나중에 리팩토링 기회가 있으면 바꾸는거로
    /**
     * 예약날짜 감사
     */
    private void validateReservationDate(LocalDateTime reservationsDate) {
        LocalDateTime now = LocalDateTime.now();

        //null체크
        if (reservationsDate == null) {
            throw new IllegalArgumentException("날짜가 null입니다.");
        }

        //과거 날짜 체크
        if(reservationsDate.isBefore(now)) {
            throw new IllegalArgumentException("예약은 현재 시간 이후여야 합니다.");
        }

        //2년까지 예약 체크
        if (reservationsDate.isAfter(now.plusYears(2))) {
            throw new IllegalArgumentException("예약은 2년 이내로 가능합니다. ");
        }

    }

}
