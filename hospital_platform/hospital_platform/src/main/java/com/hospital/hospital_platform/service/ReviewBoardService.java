package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.board.ReviewBoard;
import com.hospital.hospital_platform.repository.ReviewBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;

    @Autowired
    public ReviewBoardService(ReviewBoardRepository reviewBoardRepository) {
        this.reviewBoardRepository = reviewBoardRepository;
    }

    @Transactional(readOnly = true)
    public List<ReviewBoard> getAllReviewBoards() {
        return reviewBoardRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<ReviewBoard> getReviewBoardById(Long id) {
        return reviewBoardRepository.findById(id);
    }

    @Transactional
    public ReviewBoard createReviewBoard(ReviewBoard reviewBoard) {
        reviewBoard.setCreateDate(LocalDateTime.now());
        reviewBoard.setUpdateDate(LocalDateTime.now());
        return reviewBoardRepository.save(reviewBoard);
    }

    @Transactional
    public Optional<ReviewBoard> updateReviewBoard(Long id, ReviewBoard reviewBoardDetails) {
        return reviewBoardRepository.findById(id)
                .map(reviewBoard -> {
                    reviewBoard.setTitle(reviewBoardDetails.getTitle());
                    reviewBoard.setContent(reviewBoardDetails.getContent());
                    reviewBoard.setHospital_id(reviewBoardDetails.getHospital_id());
                    reviewBoard.setHospital_name(reviewBoardDetails.getHospital_name());
                    reviewBoard.setUpdateDate(LocalDateTime.now());
                    return reviewBoardRepository.save(reviewBoard);
                });
    }

    @Transactional
    public void deleteReviewBoard(Long id) {
        reviewBoardRepository.deleteById(id);
    }
}