// src/components/TreatmentHistory.js

import React from 'react';
import './TreatmentHistory.css';
import tabletImage from '../images/tablet-image.jpg'; // 이미지 파일 경로를 적절히 수정해주세요

const TreatmentHistory = () => {
    return (
        <div className="treatment-history">
            <div className="image-container">
                <img src={tabletImage} alt="태블릿으로 진료 내역 확인하는 모습" />
            </div>
            <div className="content-container">
                <h2>진료 내역 관리</h2>
                <div className="feature">
                    <h3>▼ 진료 기록 한눈에 보기</h3>
                    <p>과거 진료 내역, 진단 결과, 처방전 등을 한 곳에서 편리하게 확인할 수 있습니다.</p>
                </div>
                <div className="feature">
                    <h3>▼ 진료 비용 내역 확인</h3>
                    <ul>
                        <li>진료 항목별 비용 내역을 투명하게 제공합니다.</li>
                        <li>보험 청구 내역도 함께 확인할 수 있습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TreatmentHistory;