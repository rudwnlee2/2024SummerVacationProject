import React from 'react';
import { updateReservation, cancelReservation } from '../api';

function ReservationList({ reservations, onReservationUpdated, onReservationCancelled }) {
    const handleUpdate = async (id, newDate) => {
        try {
            await updateReservation(id, { reservationDate: newDate });
            onReservationUpdated();
        } catch (error) {
            console.error('Failed to update reservation:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelReservation(id);
            onReservationCancelled();
        } catch (error) {
            console.error('Failed to cancel reservation:', error);
        }
    };

    return (
        <ul>
            {reservations.map((reservation) => (
                <li key={reservation.id}>
                    날짜: {new Date(reservation.reservationDate).toLocaleString()}
                    <button onClick={() => handleUpdate(reservation.id, new Date())}>
                        수정
                    </button>
                    <button onClick={() => handleCancel(reservation.id)}>취소</button>
                </li>
            ))}
        </ul>
    );
}

export default ReservationList;