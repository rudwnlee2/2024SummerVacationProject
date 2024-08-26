import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';  // 날짜 선택을 위한 라이브러리
import 'react-datepicker/dist/react-datepicker.css';
import { createReservation } from '../api';  // API 함수 추가

function ReservationSystem() {
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            setHospitalName(location.state.hospitalName || '');
            setHospitalId(location.state.hospitalId || '');
        }
    }, [location]);

    const handleReservation = async (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        try {
            // ReservationDTO에 해당하는 데이터 구조
            const reservationDTO = {
                userId: 1, // 예시로 사용자 ID를 하드코딩, 실제로는 로그인된 사용자 ID를 사용
                hospitalId: parseInt(hospitalId, 10),
                reservationDate: selectedDate.toISOString()
            };

            // HospitalDTO에 해당하는 데이터 구조
            const hospitalDTO = {
                id: parseInt(hospitalId, 10),
                name: hospitalName
            };

            // ReservationRequestDTO에 해당하는 데이터 구조
            const reservationRequestDTO = {
                reservationDTO,
                hospitalDTO
            };

            await createReservation(reservationRequestDTO);
            alert('예약이 완료되었습니다.');
            navigate('/'); // 예약 성공 시 Home으로 이동
        } catch (error) {
            console.error("예약 생성 중 오류 발생:", error);
            alert("예약에 실패했습니다: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="ReservationSystem">
            <h1>치과 예약 시스템</h1>
            <form className="reservation-form" onSubmit={handleReservation}>
                <div className="input-group">
                    <label>병원 이름:</label>
                    <input type="text" value={hospitalName} readOnly />
                </div>
                <div className="input-group">
                    <label>병원 ID:</label>
                    <input type="text" value={hospitalId} readOnly />
                </div>
                <div className="input-group">
                    <label>예약 날짜와 시간:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd h:mm aa"
                        timeFormat="HH:mm"
                        timeIntervals={15}  // 15분 단위로 시간 선택 가능
                        minDate={new Date()}
                    />
                </div>
                <button type="submit">예약하기</button>
            </form>
        </div>
    );
}

export default ReservationSystem;
