package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.board.FreeBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FreeBoardCommentRepository extends JpaRepository<FreeBoardComment, Long> {
    List<FreeBoardComment> findByFreeBoard_Id(Long freeBoardId);  // 특정 FreeBoard의 ID에 의한 댓글 검색
}
