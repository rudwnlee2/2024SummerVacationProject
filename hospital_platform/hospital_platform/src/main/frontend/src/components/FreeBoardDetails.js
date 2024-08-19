import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FreeBoardDetails() {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const response = await axios.get('/api/comments');
        setComments(response.data);
    };

    const handleAddComment = async () => {
        if (!content) return;
        await axios.post('/api/comments', { content });
        fetchComments();  // 댓글 목록 갱신
        setContent('');  // 입력 필드 초기화
    };

    const handleDeleteComment = async (id) => {
        await axios.delete(`/api/comments/${id}`);
        fetchComments();  // 댓글 목록 갱신
    };

    return (
        <div>
            <h1>Comments</h1>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {comment.content}
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FreeBoardDetails;
