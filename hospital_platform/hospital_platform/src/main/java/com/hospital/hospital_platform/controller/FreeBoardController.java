package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.domain.board.FreeBoard;
import com.hospital.hospital_platform.service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/freeboards")
@CrossOrigin(origins = "*") // 모든 도메인에서의 접근을 허용
public class FreeBoardController {

    @Autowired
    private FreeBoardService freeBoardService;

    @PostMapping
    public FreeBoard createFreeBoard(@RequestBody FreeBoard freeBoard) {
        return freeBoardService.saveFreeBoard(freeBoard);
    }

    @GetMapping("/{id}")
    public FreeBoard getFreeBoardById(@PathVariable Long id) {
        return freeBoardService.getFreeBoardById(id);
    }

    @GetMapping
    public List<FreeBoard> getAllFreeBoards() {
        return freeBoardService.getAllFreeBoards();
    }

    @DeleteMapping("/{id}")
    public void deleteFreeBoard(@PathVariable Long id) {
        freeBoardService.deleteFreeBoard(id);
    }

    // 게시글 업데이트 API 추가
    @PutMapping("/{id}")
    public ResponseEntity<FreeBoard> updateFreeBoard(@PathVariable Long id, @RequestBody FreeBoard freeBoard) {
        FreeBoard updated = freeBoardService.updateFreeBoard(id, freeBoard);
        return ResponseEntity.ok(updated);
    }
}
