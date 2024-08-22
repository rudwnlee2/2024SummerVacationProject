package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.board.ReviewBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewBoardRepository extends JpaRepository<ReviewBoard, Long> {
    // 필요한 경우 추가적인 쿼리 메서드 정의
}