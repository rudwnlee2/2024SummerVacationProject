package com.hospital.hospital_platform.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity //JPA 엔티티 선언
@NoArgsConstructor //기본생성자 생성 꼭 필요(데이터베이스에서 데이터를 조회할 때 기본 생성자를 통해 객체를 생성)  lombok을 이용해서 간단하게 함
@Getter
@Setter //getter setter 원래는 setter를 빼야함
public class Admin {

    @Id //pk
    @Column(name = "admin_id") //컬럼이름
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long id;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phoneNum;

    @Embedded //Entity가 아닌 값 타입
    private Address address;

    @Enumerated(EnumType.STRING) //이부분은 한번 더 확인 필요
    private Role role;

    @OneToMany(mappedBy = "admin") //mappedBy를 안쓰면 단방향이 되버림
    private List<Inquiry> inquiries = new ArrayList<>();

}
