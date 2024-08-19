import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './CommunityPostCreate.css';

function CommunityPostCreate() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 게시글 로드
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:8080/api/freeboards');
        setPosts(response.data);
    };

    // 게시글 생성
    const handleAddPost = async () => {
        // await axios.post('http://localhost:8080/api/freeboards', { title, content });
        const response = await axios.post('http://localhost:8080/api/freeboards', { title, content });
        console.log(response);
        fetchPosts();  // 게시글 목록 갱신
    };

    // 게시글 삭제
    const handleDeletePost = async (id) => {
        await axios.delete(`http://localhost:8080/api/freeboards/${id}`);
        fetchPosts();  // 게시글 목록 갱신
    };

    return (
        <div className="container">
            <p className="header-title">게시글 작성</p>
            <div className="message-box">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                       placeholder="제목을 여기에 입력하세요" />
            </div>
            <div className="message-box">
                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                          placeholder="내용을 여기에 입력하세요" />
            </div>
            <div className="button-area">
                <button className="submit-button" onClick={handleAddPost}>게시글 등록</button>
            </div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title} - {post.content}
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/CommunityBoard">
                <button>커뮤니티 페이지</button>
            </Link>
        </div>
    );
}

export default CommunityPostCreate;