package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.domain.board.ReviewBoard;
import com.hospital.hospital_platform.service.ReviewBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviewboards")
public class ReviewBoardController {

    private final ReviewBoardService reviewBoardService;

    @Autowired
    public ReviewBoardController(ReviewBoardService reviewBoardService) {
        this.reviewBoardService = reviewBoardService;
    }

    @GetMapping
    public List<ReviewBoard> getAllReviewBoards() {
        return reviewBoardService.getAllReviewBoards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewBoard> getReviewBoardById(@PathVariable Long id) {
        return reviewBoardService.getReviewBoardById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ReviewBoard createReviewBoard(@RequestBody ReviewBoard reviewBoard) {
        return reviewBoardService.createReviewBoard(reviewBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewBoard(@PathVariable Long id) {
        reviewBoardService.deleteReviewBoard(id);
        return ResponseEntity.ok().build();
    }

    // 추가적인 엔드포인트들...
}