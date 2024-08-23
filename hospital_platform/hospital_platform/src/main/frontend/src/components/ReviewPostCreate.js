import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import './ReviewPostCreate.css';

function ReviewPostCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalId, setHospitalId] = useState('');
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
                hospital_name: hospitalName,
                hospital_id: parseInt(hospitalId, 10)
            });
            navigate('/ReviewBoard');
        } catch (error) {
            console.error("리뷰 생성 중 오류 발생:", error);
            alert("리뷰 생성에 실패했습니다: " + (error.response?.data || error.message));
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
                <input type="text" value={hospitalName} readOnly placeholder="병원 이름" />
            </div>
            <div className="message-box">
                <input type="text" value={hospitalId} readOnly placeholder="병원 ID" />
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