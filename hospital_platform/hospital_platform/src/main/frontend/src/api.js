import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username, password) => {
    const response = await api.post('/login', { username, password });
    return response.data;
};

export const getReservations = async () => {
    const response = await api.get('/reservations');
    return response.data;
};

export const createReservation = async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
};

export const updateReservation = async (id, reservationData) => {
    const response = await api.put(`/reservations/${id}`, reservationData);
    return response.data;
};

export const cancelReservation = async (id) => {
    await api.delete(`/reservations/${id}`);
};

// api.js 파일에 추가

export const getMyReservations = async () => {
    try {
        const response = await fetch('/api/reservations/my', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('내 예약 목록을 가져오는데 실패했습니다');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        throw error;
    }
};

// MyPage 데이터를 가져오는 함수 추가
export const fetchMyPageData = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // 토큰 로깅
    try {
        const response = await axios.get('/api/myPage', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('API Response:', response); // 응답 로깅
        return response;
    } catch (error) {
        console.error('API Error:', error.response || error); // 에러 로깅
        throw error;
    }
};
