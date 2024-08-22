/*
package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.domain.board.ReviewBoardComment;
import com.hospital.hospital_platform.service.ReviewBoardCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviewboards/{reviewBoardId}/comments")
public class ReviewBoardCommentController {

    private final ReviewBoardCommentService reviewBoardCommentService;

    @Autowired
    public ReviewBoardCommentController(ReviewBoardCommentService reviewBoardCommentService) {
        this.reviewBoardCommentService = reviewBoardCommentService;
    }

    @GetMapping
    public List<ReviewBoardComment> getCommentsByReviewBoardId(@PathVariable Long reviewBoardId) {
        return reviewBoardCommentService.getCommentsByReviewBoardId(reviewBoardId);
    }

    @PostMapping
    public ReviewBoardComment createComment(@PathVariable Long reviewBoardId, @RequestBody ReviewBoardComment comment) {
        comment.setReviewBoardId(reviewBoardId);
        return reviewBoardCommentService.createComment(comment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long reviewBoardId, @PathVariable Long commentId) {
        reviewBoardCommentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<ReviewBoardComment> getCommentById(@PathVariable Long reviewBoardId, @PathVariable Long commentId) {
        return reviewBoardCommentService.getCommentById(commentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 필요한 경우 추가 엔드포인트 구현
}*/
