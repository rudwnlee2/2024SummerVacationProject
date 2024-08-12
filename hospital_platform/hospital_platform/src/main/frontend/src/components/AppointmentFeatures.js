// AppointmentFeatures.js

/*
import React from 'react';
import './AppointmentFeatures.css';

const AppointmentFeatures = () => {
    return (
        <div className="appointment-features">
            <h1>예약 및 취소 기능</h1>
            <div className="timeline">
                <div className="feature">
                    <h2>일정 확인</h2>
                    <p>원하는 날짜와 시간을 쉽게 찾아 예약할 수 있습니다.</p>
                </div>
                <div className="feature">
                    <h2>예약 진행</h2>
                    <p>간단한 절차를 거쳐 실시간으로 예약을 완료할 수 있습니다.</p>
                </div>
                <div className="feature">
                    <h2>예약 취소</h2>
                    <p>여건 변화에 따라 언제든지 예약을 취소할 수 있습니다.</p>
                </div>
                <div className="timeline-bar">
                    <div className="timeline-point">1</div>
                    <div className="timeline-point">2</div>
                    <div className="timeline-point">3</div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentFeatures;

*/

// src/components/AppointmentFeatures.js
import React from 'react';
import './AppointmentFeatures.css';
import {Link} from "react-router-dom";

function AppointmentFeatures() {
    return (
        <div className="appointment-features">
            <h1 className="title">예약 및 취소 기능</h1>
            <div className="features">
                <div className="appointment-feature-item">
                    <h2 className="feature-title">일정 확인</h2>
                    <p className="feature-description">원하는 날짜와 시간을 쉽게 찾아 예약할 수 있습니다.</p>
                    <div className="step-number">1</div>
                </div>
                <div className="appointment-feature-item">
                    <h2 className="feature-title">예약 진행</h2>
                    <p className="feature-description">간단한 절차를 거쳐 실시간으로 예약을 완료할 수 있습니다.</p>
                    <div className="step-number">2</div>
                </div>
                <div className="appointment-feature-item">
                    <h2 className="feature-title">예약 취소</h2>
                    <p className="feature-description">여건 변화에 따라 언제든지 예약을 취소할 수 있습니다.</p>
                    <div className="step-number">3</div>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default AppointmentFeatures;
