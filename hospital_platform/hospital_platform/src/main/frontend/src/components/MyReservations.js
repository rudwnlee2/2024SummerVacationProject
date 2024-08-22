import React from 'react';
import { updateReservation, cancelReservation } from '../api';

function MyReservations({ myReservations, onReservationUpdated, onReservationCancelled }) {
    const handleUpdate = async (id, updatedData) => {
        try {
            await updateReservation(id, updatedData);
            onReservationUpdated();
        } catch (error) {
            console.error('예약 수정에 실패했습니다:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelReservation(id);
            onReservationCancelled();
        } catch (error) {
            console.error('예약 취소에 실패했습니다:', error);
        }
    };

    return (
        <div className="MyReservations">
            <h2>내 예약</h2>
            {myReservations.map((reservation) => (
                <div key={reservation.id} className="reservation-item">
                    <p>날짜: {reservation.date}</p>
                    <p>시간: {reservation.time}</p>
                    <p>이유: {reservation.reason}</p>
                    <button onClick={() => handleUpdate(reservation.id, { /* 수정할 데이터 */ })}>
                        수정
                    </button>
                    <button onClick={() => handleCancel(reservation.id)}>취소</button>
                </div>
            ))}
        </div>
    );
}

export default MyReservations;