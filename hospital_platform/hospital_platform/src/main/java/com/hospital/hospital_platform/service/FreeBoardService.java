package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.board.FreeBoard;
import com.hospital.hospital_platform.repository.FreeBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FreeBoardService {

    @Autowired
    private FreeBoardRepository boardRepository;

    public FreeBoard saveFreeBoard(FreeBoard freeBoard) {
        return boardRepository.save(freeBoard);
    }

    public FreeBoard getFreeBoardById(Long id) {
        return boardRepository.findById(id).orElse(null);
    }

    public List<FreeBoard> getAllFreeBoards() {
        return boardRepository.findAll();
    }

    public void deleteFreeBoard(Long id) {
        boardRepository.deleteById(id);
    }

    // 게시글 업데이트 메서드 추가
    public FreeBoard updateFreeBoard(Long id, FreeBoard updatedFreeBoard) {
        return boardRepository.findById(id).map(freeBoard -> {
            freeBoard.setTitle(updatedFreeBoard.getTitle());
            freeBoard.setContent(updatedFreeBoard.getContent());
            freeBoard.setUpdateDate(LocalDateTime.now()); // 업데이트 시간 설정
            return boardRepository.save(freeBoard);
        }).orElseGet(() -> {
            updatedFreeBoard.setId(id);
            return boardRepository.save(updatedFreeBoard);
        });
    }
}
