import React from "react";
import './EventsPromotion.css';

const EventsPromotion = () => (
    <div className="events-promotion">
        <h2>이벤트 및 프로모션</h2>
        <div className="event-items">
            <div>
                <p>1</p>
                <h3>정기 검진 이벤트</h3>
                <small>정기 건강검진 시 추가 혜택을 제공합니다.</small>
            </div>
            <div>
                <p>2</p>
                <h3>SNS 이벤트</h3>
                <small>소셜미디어 팔로우 및 공유 이벤트를 진행합니다.</small>
            </div>
            <div>
                <p>3</p>
                <h3>상시 프로모션</h3>
                <small>다양한 할인과 이벤트를 통해 고객 만족도를 높입니다.</small>
            </div>
        </div>
    </div>
);

export default EventsPromotion;