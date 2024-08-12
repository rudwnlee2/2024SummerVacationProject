// src/components/ConsultationFeature.js
import React from 'react';
import './ConsultationFeature.css';

const ConsultationFeature = () => {
    return (
        <div className="consultation-feature">
            <h2>1:1 상담 기능</h2>
            <div className="consultation-feature-content">
                <div className="consultation-feature-item">
                    <h3>▼ 전문의와의 1:1 상담</h3>
                    <p>치과 전문의와 실시간으로 상담하여 개인 맞춤 진료 계획을 수립할 수 있습니다.</p>
                </div>
                <div className="consultation-feature-item">
                    <h3>▼ 상담 예약 및 관리</h3>
                    <ul>
                        <li>언제든 편하게 상담 예약이 가능합니다.</li>
                        <li>상담 내용과 결과를 체계적으로 관리할 수 있습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ConsultationFeature;