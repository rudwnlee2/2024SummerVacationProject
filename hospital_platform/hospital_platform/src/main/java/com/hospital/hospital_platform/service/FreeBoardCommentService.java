package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.board.FreeBoardComment;
import com.hospital.hospital_platform.repository.FreeBoardCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FreeBoardCommentService {

    @Autowired
    private FreeBoardCommentRepository commentRepository;

    public FreeBoardComment saveComment(FreeBoardComment comment) {
        comment.setCreateDate(LocalDateTime.now());  // 댓글 생성 시간 설정
        comment.setUpdateDate(LocalDateTime.now());  // 초기 업데이트 시간도 생성 시간과 동일하게 설정
        return commentRepository.save(comment);
    }

    public List<FreeBoardComment> findAllComments() {
        return commentRepository.findAll();
    }

    public FreeBoardComment findCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public List<FreeBoardComment> findCommentsByPostId(Long freeBoardId) {
        return commentRepository.findByFreeBoard_Id(freeBoardId);
    }
}
