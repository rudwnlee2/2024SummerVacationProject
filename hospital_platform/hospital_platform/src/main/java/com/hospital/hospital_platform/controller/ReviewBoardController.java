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
    public ResponseEntity<List<ReviewBoard>> getAllReviewBoards() {
        List<ReviewBoard> reviews = reviewBoardService.getAllReviewBoards();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<ReviewBoard> createReviewBoard(@RequestBody ReviewBoard reviewBoard) {
        ReviewBoard createdReview = reviewBoardService.createReviewBoard(reviewBoard);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewBoard> getReviewBoardById(@PathVariable Long id) {
        return reviewBoardService.getReviewBoardById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewBoard> updateReviewBoard(@PathVariable Long id, @RequestBody ReviewBoard reviewBoard) {
        return reviewBoardService.updateReviewBoard(id, reviewBoard)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewBoard(@PathVariable Long id) {
        reviewBoardService.deleteReviewBoard(id);
        return ResponseEntity.ok().build();
    }
}