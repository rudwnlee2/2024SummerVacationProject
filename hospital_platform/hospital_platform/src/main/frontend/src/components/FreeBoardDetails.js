import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FreeBoardDetails() {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    const fetchComments = useCallback(async () => {
        const response = await axios.get(`/api/comments/post/${postId}`);
        setComments(response.data);
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleAddComment = async () => {
        if (!content) return;
        await axios.post('/api/comments', { content, postId });
        fetchComments();
        setContent('');
    };

    const handleDeleteComment = async (id) => {
        await axios.delete(`/api/comments/${id}`);
        fetchComments();
    };

    return (
        <div>
            <h1>Comments for Post {postId}</h1>
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
