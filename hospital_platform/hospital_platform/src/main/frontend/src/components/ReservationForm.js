import React, { useState } from 'react';
import { createReservation } from '../api';

function ReservationForm({ onReservationCreated }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [hospitalId, setHospitalId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReservation({
                reservationDate: `${date}T${time}:00`,
                hospitalId: parseInt(hospitalId),
            });
            onReservationCreated();
            setDate('');
            setTime('');
            setHospitalId('');
        } catch (error) {
            console.error('Failed to create reservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <input
                type="number"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
                placeholder="Hospital ID"
                required
            />
            <button type="submit">예약 생성</button>
        </form>
    );
}

export default ReservationForm;