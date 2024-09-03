import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // 토큰을 로컬 스토리지에서 가져옴
                if (!token) {
                    navigate('/login'); // 토큰이 없으면 로그인 페이지로 리다이렉트
                    return;
                }

                const response = await axios.get('/MyPage', {
                    headers: {
                        'Authorization': token
                    }
                });

                console.log('User Data:', response.data); // 사용자 데이터 확인
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err); // 에러 확인
                setError('Failed to fetch user data');
                navigate('/login'); // 실패 시 로그인 페이지로 리다이렉트
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
            <p><strong>password:</strong> {user.password}</p>
            <p><strong>Username:</strong> {user.name}</p>
            <p><strong>nickname:</strong> {user.nickname}</p>
            <p><strong>phoneNum:</strong> {user.phoneNum}</p>
            <p><strong>Address:</strong> {user.address}</p>
            {/* 다른 사용자 정보도 여기 추가 */}
        </div>
    );
};

export default MyPage;
