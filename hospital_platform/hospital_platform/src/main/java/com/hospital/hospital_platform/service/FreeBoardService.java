package com.hospital.hospital_platform.service;

import com.hospital.hospital_platform.domain.board.FreeBoard;
import com.hospital.hospital_platform.repository.FreeBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}