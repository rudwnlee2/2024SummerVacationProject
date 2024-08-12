// src/components/TreatmentInfo.js

import React from 'react';
import './TreatmentInfo.css';

const TreatmentInfo = () => {
    return (
        <div className="treatment-info">
            <h1>치과 정보 및 리뷰 확인</h1>
            <div className="info-container">
                <div className="info-item">
                    <h2>치과 정보</h2>
                    <p>치과 위치, 진료 시간, 전문의 프로필 등 상세한 치과 정보를 확인하세요.</p>
                </div>
                <div className="info-item">
                    <h2>환자 리뷰</h2>
                    <p>실제 이용 환자들의 생생한 후기를 통해 치과를 객관적으로 평가해보세요.</p>
                </div>
                <div className="info-item">
                    <h2>후기 작성</h2>
                    <p>진료 만족도를 공유하여 다른 환자들에게 도움을 주세요.</p>
                </div>
            </div>
        </div>
    );
};

export default TreatmentInfo;