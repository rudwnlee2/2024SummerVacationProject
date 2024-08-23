import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewBoard = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reviewboards');
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰 불러오기 오류:', error);
            alert('리뷰를 불러오는데 실패했습니다: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>리뷰 게시판</h2>
            {reviews.map((review) => (
                <div key={review.id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}
                     onClick={() => navigate(`/ReviewBoard/${review.id}`)}>
                    <h3>제목: {review.title}</h3>
                    <p>병원 이름: {review.hospital_name}</p>
                    <p>병원 ID: {review.hospital_id}</p>
                    <p>내용: {review.content}</p>
                    <p>작성일: {new Date(review.createDate).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewBoard;