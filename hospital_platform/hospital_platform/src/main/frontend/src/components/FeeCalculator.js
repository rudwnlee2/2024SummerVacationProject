// src/components/FeeCalculator.js
import React from 'react';
import './FeeCalculator.css';

const FeeCalculator = () => {
    return (
        <div className="fee-calculator">
            <h2>진료비 검적 계산기</h2>
            <div className="calculator-grid">
                <div className="calculator-item">
                    <h3>맞춤형 견적</h3>
                    <p>필요한 치료 항목을 선택하면 실시간 맞춤 견적을 제공합니다.</p>
                </div>
                <div className="calculator-item">
                    <h3>보험 적용 금액</h3>
                    <p>보험 적용 내역을 반영하여 실제 부담 비용을 확인할 수 있습니다.</p>
                </div>
                <div className="calculator-item">
                    <h3>결제 옵션</h3>
                    <p>다양한 결제 방식을 제공하여 편리하게 진료비를 납부할 수 있습니다.</p>
                </div>
                <div className="calculator-item">
                    <h3>추가 문의</h3>
                    <p>견적에 대한 궁금한 점은 1:1 상담을 통해 해결할 수 있습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default FeeCalculator;