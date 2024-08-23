import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ReviewBoardDetails() {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reviewboards/${id}`);
                setReview(response.data);
                setLoading(false);
            } catch (err) {
                setError('리뷰를 불러오는데 실패했습니다.');
                setLoading(false);
                console.error('리뷰 상세 정보 불러오기 오류:', err);
            }
        };

        fetchReviewDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8080/api/reviewboards/${id}`);
                navigate('/ReviewBoard');
            } catch (err) {
                setError('리뷰 삭제에 실패했습니다.');
                console.error('리뷰 삭제 오류:', err);
            }
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

    return (
        <div className="review-details">
            <h2>{review.title}</h2>
            <p><strong>병원 이름:</strong> {review.hospital_name}</p>
            <p><strong>병원 ID:</strong> {review.hospital_id}</p>
            <p><strong>내용:</strong> {review.content}</p>
            <p><strong>작성일:</strong> {new Date(review.createDate).toLocaleString()}</p>
            <p><strong>수정일:</strong> {new Date(review.updateDate).toLocaleString()}</p>
            <button onClick={() => navigate(`/ReviewBoard/edit/${id}`)}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={() => navigate('/ReviewBoard')}>목록으로 돌아가기</button>
        </div>
    );
}

export default ReviewBoardDetails;