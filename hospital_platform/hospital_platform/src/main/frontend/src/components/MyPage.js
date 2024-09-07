import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyPageData } from '../api'; // api.js에서 함수 임포트
import axios from 'axios';

const MyPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...'); // 요청 시작 로깅
                const response = await fetchMyPageData();
                console.log('User data received:', response.data); // 받은 데이터 로깅
                setUser(response.data);
            } catch (err) {
                console.error('Error in fetchUserData:', err.response || err); // 상세 에러 로깅
                console.error('Error details:', err.response || err);
                if (err.response && err.response.status === 401) {
                    setError('Session expired. Please login again.');
                    setTimeout(() => navigate('/login'), 3000);
                } else {
                    setError('Failed to fetch user data. Please try again later.');
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>My Page</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.name}</p>
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Phone Number:</strong> {user.phoneNum}</p>
            <p><strong>Address:</strong> {user.address}</p>
        </div>
    );
};

export default MyPage;