import React, { useState, useEffect } from 'react';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import MyReservations from './MyReservations';  // 새로운 컴포넌트
import { getReservations, getMyReservations } from '../api';  // API 함수 추가

function ReservationSystem() {
    const [reservations, setReservations] = useState([]);
    const [myReservations, setMyReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
        fetchMyReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (error) {
            console.error('예약 목록을 가져오는데 실패했습니다:', error);
        }
    };

    const fetchMyReservations = async () => {
        try {
            const data = await getMyReservations();
            //setMyReservations(data);
        } catch (error) {
            console.error('내 예약 목록을 가져오는데 실패했습니다:', error);
        }
    };

    const handleReservationUpdate = () => {
        fetchReservations();
        fetchMyReservations();
    };

    return (
        <div className="ReservationSystem">
            <h1>치과 예약 시스템</h1>
            <ReservationForm onReservationCreated={handleReservationUpdate} />
            <MyReservations
                myReservations={myReservations}
                onReservationUpdated={handleReservationUpdate}
                onReservationCancelled={handleReservationUpdate}
            />
            <ReservationList
                reservations={reservations}
                onReservationUpdated={handleReservationUpdate}
                onReservationCancelled={handleReservationUpdate}
            />
        </div>
    );
}

export default ReservationSystem;