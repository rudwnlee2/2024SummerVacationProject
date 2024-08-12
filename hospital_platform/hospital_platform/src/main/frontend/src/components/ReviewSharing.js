import React from "react";
import './ReviewSharing.css';

const ReviewSharing = () => (
    <div className="review-sharing">
        <h2>진료 후기 공유</h2>
        <div className="review-items">
            <div>
                <p>1</p>
                <h3>진료 만족도</h3>
                <small>의료진의 전문성과 환자 서비스에 대한 후기를 작성할 수 있습니다.</small>
            </div>
            <div>
                <p>2</p>
                <h3>시설 및 환경</h3>
                <small>병원의 청결도, 편의성, 접근성 등에 대한 의견을 공유할 수 있습니다.</small>
            </div>
            <div>
                <p>3</p>
                <h3>가성비 평가</h3>
                <small>진료비 대비 서비스 수준에 대한 후기를 작성할 수 있습니다.</small>
            </div>
        </div>
    </div>
);

export default ReviewSharing;