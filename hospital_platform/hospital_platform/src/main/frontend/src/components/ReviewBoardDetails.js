import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReviewBoardDetails() {
    const [review, setReview] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { id } = useParams();

    const fetchReview = useCallback(async () => {
        const response = await axios.get(`/api/reviewboards/${id}`);
        setReview(response.data);
    }, [id]);

    const fetchComments = useCallback(async () => {
        const response = await axios.get(`/api/reviewboards/${id}/comments`);
        setComments(response.data);
    }, [id]);

    useEffect(() => {
        fetchReview();
        fetchComments();
    }, [fetchReview, fetchComments]);

    const handleAddComment = async () => {
        if (!content) return;
        await axios.post(`/api/reviewboards/${id}/comments`, { content });
        fetchComments();
        setContent('');
    };

    const handleDeleteComment = async (commentId) => {
        await axios.delete(`/api/reviewboards/${id}/comments/${commentId}`);
        fetchComments();
    };

    if (!review) return <div>Loading...</div>;

    return (
        <div>
            <h1>{review.title}</h1>
            <p>병원: {review.hospitalName}</p>
            <p>평점: {review.rating}/5</p>
            <p>{review.content}</p>

            <h2>댓글</h2>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력하세요"
            />
            <button onClick={handleAddComment}>댓글 작성</button>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment.content}
                        <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReviewBoardDetails;