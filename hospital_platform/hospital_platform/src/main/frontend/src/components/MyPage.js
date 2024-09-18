import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyPageData } from '../api'; // api.js에서 함수 임포트
import axios from 'axios';

function MyPage() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // 디버깅: 토큰 출력

            if (!token) {
                throw new Error('인증 토큰이 없습니다.');
            }

            const response = await axios.get('/api/myPage', {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('API Response:', response.data); // 디버깅: 응답 데이터 출력

            setUserInfo(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error details:', err.response || err); // 디버깅: 상세 에러 정보 출력
            setError(`사용자 정보를 불러오는데 실패했습니다. 오류: ${err.message}`);
            setLoading(false);
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!userInfo) return <div>사용자 정보가 없습니다.</div>;

    return (
        <div className="MyPage">
            <h1>마이페이지</h1>
            <div className="user-info">
                <h2>사용자 정보</h2>
                <p><strong>이름:</strong> {userInfo.name}</p>
                <p><strong>이메일:</strong> {userInfo.email}</p>
                <p><strong>전화번호:</strong> {userInfo.phoneNumber}</p>
            </div>
        </div>
    );
}

export default MyPage;