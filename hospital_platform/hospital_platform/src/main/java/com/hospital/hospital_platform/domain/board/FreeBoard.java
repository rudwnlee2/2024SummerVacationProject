package com.hospital.hospital_platform.domain.board;

import com.hospital.hospital_platform.domain.Reservation;
import com.hospital.hospital_platform.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity //JPA 엔티티 선언
@NoArgsConstructor //기본생성자 생성 꼭 필요(데이터베이스에서 데이터를 조회할 때 기본 생성자를 통해 객체를 생성)  lombok을 이용해서 간단하게 함
@Getter
@Setter //getter setter 원래는 setter를 빼야함
public class FreeBoard {

    @Id //pk
    @Column(name = "freeBoard_id") //컬럼이름
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long id;

    @ManyToOne(fetch = LAZY) //다대일 매핑 지연로딩(엔티티를 조회할 때, 연관된 엔티티는 실제 사용 시점에 조회)
    @JoinColumn(name = "user_id")
    private User user;

    private String title;
    private Long like;
    private Long view;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    @OneToMany(mappedBy = "freeBoard") //mappedBy를 안쓰면 단방향이 되버림
    private List<FreeBoardComment> freeBoardComments = new ArrayList<>();

}
