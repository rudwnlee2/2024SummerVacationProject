import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewBoard.css';
import { Link } from "react-router-dom";

const ReviewBoard = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reviewboards');
                const cleanedReviews = response.data.map(review => ({
                    ...review,
                    title: review.title.trim(),
                    content: review.content.trim()
                }));
                setReviews(cleanedReviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <>
            <div>
                <h1>리뷰 게시판</h1>
                <Link to="/AppointmentFeatures">
                    <button>메인으로 돌아가기</button>
                </Link>
                <Link to="/ReviewPostCreate">
                    <button>리뷰 작성하기</button>
                </Link>
            </div>

            <div className="review-board">
                <h2>리뷰 목록</h2>
                {reviews.map(review => (
                    <div key={review.id} className="card">
                        <div className="card-header">
                            <img src="#" alt="Profile" />
                            <div>
                                <div className="name">{review.authorName}</div>
                                <div className="time-location">{review.createdAt}, {review.hospitalName}</div>
                            </div>
                            <div className="rating">
                                <span>★ {review.rating}/5.0</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <Link to={`/ReviewBoardDetails/${review.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                <div className="title">
                                    <p>{review.title}</p>
                                </div>
                                <div className="content-p">
                                    <p>{review.content}</p>
                                </div>
                            </Link>
                            <span className="read-more">더보기</span>
                        </div>
                        <div className="card-tags">
                            <span>{review.hospitalName}</span>
                            <span>{review.treatment}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReviewBoard;