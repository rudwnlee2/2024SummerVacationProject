import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import './ReviewPostCreate.css';

console.log("ReviewPostCreate component loaded");


function ReviewPostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [rating, setRating] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setHospitalName(location.state.hospitalName || '');
            setHospitalId(location.state.hospitalId || '');
        }
    }, [location]);

    const handleAddReview = async () => {
        try {
            await axios.post('http://localhost:8080/api/reviewboards', {
                title,
                content,
                hospitalName,
                hospitalId,
                rating
            });
            navigate('/ReviewBoard');
        } catch (error) {
            console.error("Error creating review:", error);
        }
    };

    return (
        <div className="container">
            <p className="header-title">리뷰 작성</p>
            <div className="message-box">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                       placeholder="제목을 입력하세요" />
            </div>
            <div className="message-box">
                <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}
                       placeholder="병원 이름" readOnly />
            </div>
            <div className="message-box">
                <input type="text" value={hospitalId} onChange={(e) => setHospitalId(e.target.value)}
                       placeholder="병원 ID" readOnly />
            </div>
            <div className="message-box">
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div className="message-box">
                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                          placeholder="리뷰 내용을 입력하세요" />
            </div>
            <div className="button-area">
                <button className="submit-button" onClick={handleAddReview}>리뷰 등록</button>
            </div>
            <button onClick={() => navigate('/ReviewBoard')}>리뷰 게시판으로 돌아가기</button>
        </div>
    );
}

export default ReviewPostCreate;