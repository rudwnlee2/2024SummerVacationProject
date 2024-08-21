import React, { useState, useEffect } from 'react';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import { getReservations } from '../api';


function ReservationSystem() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (error) {
            console.error('예약 목록을 가져오는데 실패했습니다:', error);
        }
    };

    return (
        <div className="ReservationSystem">
            <h1>치과 예약 시스템</h1>
            <ReservationForm onReservationCreated={fetchReservations} />
            <ReservationList
                reservations={reservations}
                onReservationUpdated={fetchReservations}
                onReservationCancelled={fetchReservations}
            />
        </div>
    );
}

export default ReservationSystem;