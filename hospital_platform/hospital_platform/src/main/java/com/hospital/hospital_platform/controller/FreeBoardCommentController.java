package com.hospital.hospital_platform.controller;

import com.hospital.hospital_platform.domain.board.FreeBoardComment;
import com.hospital.hospital_platform.service.FreeBoardCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class FreeBoardCommentController {

    @Autowired
    private FreeBoardCommentService commentService;

    @PostMapping
    public FreeBoardComment addComment(@RequestBody FreeBoardComment comment) {
        return commentService.saveComment(comment);
    }

    @GetMapping
    public List<FreeBoardComment> getAllComments() {
        return commentService.findAllComments();
    }

    @GetMapping("/{id}")
    public FreeBoardComment getCommentById(@PathVariable Long id) {
        return commentService.findCommentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }

    @GetMapping("/post/{postId}")
    public List<FreeBoardComment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.findCommentsByPostId(postId);
    }
}
