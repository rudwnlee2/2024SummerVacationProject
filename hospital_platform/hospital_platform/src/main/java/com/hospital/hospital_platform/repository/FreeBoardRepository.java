package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.board.FreeBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {

}
