/*
package com.hospital.hospital_platform.service;


import com.hospital.hospital_platform.domain.board.ReviewBoardComment;
import com.hospital.hospital_platform.repository.ReviewBoardCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewBoardCommentService {

    private final ReviewBoardCommentRepository reviewBoardCommentRepository;

    @Autowired
    public ReviewBoardCommentService(ReviewBoardCommentRepository reviewBoardCommentRepository) {
        this.reviewBoardCommentRepository = reviewBoardCommentRepository;
    }

    public List<ReviewBoardComment> getCommentsByReviewBoardId(Long reviewBoardId) {
        return reviewBoardCommentRepository.findByReviewBoardId(reviewBoardId);
    }

    public Optional<ReviewBoardComment> getCommentById(Long id) {
        return reviewBoardCommentRepository.findById(id);
    }

    public ReviewBoardComment createComment(ReviewBoardComment comment) {
        return reviewBoardCommentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        reviewBoardCommentRepository.deleteById(id);
    }

    // 필요한 경우 추가 메서드 구현
}
 */