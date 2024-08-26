import React, { useState, useEffect } from 'react';
import { getMyReservations, updateReservation, cancelReservation } from '../api';
import DatePicker from 'react-datepicker';

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editDate, setEditDate] = useState(new Date());

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await getMyReservations();
            setReservations(data);
        } catch (error) {
            console.error("예약 정보 조회 중 오류 발생:", error);
            alert("예약 정보 조회에 실패했습니다.");
        }
    };

    const handleEdit = (id, currentDate) => {
        setEditingId(id);
        setEditDate(new Date(currentDate));
    };

    const handleUpdate = async (id) => {
        try {
            await updateReservation(id, { reservationDate: editDate.toISOString() });
            setEditingId(null);
            fetchReservations();
            alert("예약이 수정되었습니다.");
        } catch (error) {
            console.error("예약 수정 중 오류 발생:", error);
            alert("예약 수정에 실패했습니다.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("정말로 이 예약을 취소하시겠습니까?")) {
            try {
                await cancelReservation(id);
                fetchReservations();
                alert("예약이 취소되었습니다.");
            } catch (error) {
                console.error("예약 취소 중 오류 발생:", error);
                alert("예약 취소에 실패했습니다.");
            }
        }
    };

    return (
        <div className="MyReservations">
            <h1>내 예약 목록</h1>
            {reservations.map(reservation => (
                <div key={reservation.id} className="reservation-item">
                    <p>병원: {reservation.hospitalName}</p>
                    <p>날짜: {
                        editingId === reservation.id
                            ? <DatePicker
                                selected={editDate}
                                onChange={date => setEditDate(date)}
                                showTimeSelect
                                dateFormat="yyyy/MM/dd h:mm aa"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                minDate={new Date()}
                            />
                            : new Date(reservation.reservationDate).toLocaleString()
                    }</p>
                    {editingId === reservation.id ? (
                        <button onClick={() => handleUpdate(reservation.id)}>수정 완료</button>
                    ) : (
                        <button onClick={() => handleEdit(reservation.id, reservation.reservationDate)}>수정</button>
                    )}
                    <button onClick={() => handleDelete(reservation.id)}>삭제</button>
                </div>
            ))}
        </div>
    );
}

export default MyReservations;