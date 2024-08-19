package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.board.FreeBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeBoardCommentRepository extends JpaRepository<FreeBoardComment, Long> {

}
