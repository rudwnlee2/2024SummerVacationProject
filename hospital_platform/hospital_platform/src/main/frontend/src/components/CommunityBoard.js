import React from 'react';
import './CommunityBoard.css';

const CommunityBoard = () => (
    <div className="community-board">
        <h2>커뮤니티 게시판</h2>
        <div className="icons">
            <div>
                <span>💬</span>
                <p>대화하기</p>
                <small>다른 환자들과 자유롭게 소통하며 정보를 공유할 수 있습니다.</small>
            </div>
            <div>
                <span>❓</span>
                <p>질문하기</p>
                <small>치과 관련 궁금증을 게시판에 올려 해답을 얻을 수 있습니다.</small>
            </div>
            <div>
                <span>⭐</span>
                <p>후기 작성</p>
                <small>진료 경험을 공유하여 다른 사람들에게 정보를 제공할 수 있습니다.</small>
            </div>
            <div>
                <span>📅</span>
                <p>이벤트 확인</p>
                <small>치과 관련 다양한 이벤트와 프로모션 정보를 확인할 수 있습니다.</small>
            </div>
        </div>
    </div>
);

export default CommunityBoard;