package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.board.ReviewBoard;
import com.hospital.hospital_platform.repository.ReviewBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;

    @Autowired
    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository) {
        this.reviewBoardRepository = reviewBoardRepository;
    }

    public List<ReviewBoard> getAllReviewBoards() {
        return reviewBoardRepository.findAll();
    }

    public Optional<ReviewBoard> getReviewBoardById(Long id) {
        return reviewBoardRepository.findById(id);
    }

    public ReviewBoard createReviewBoard(ReviewBoard reviewBoard) {
        return reviewBoardRepository.save(reviewBoard);
    }

    public void deleteReviewBoard(Long id) {
        reviewBoardRepository.deleteById(id);
    }

    // 추가적인 메서드들...
}