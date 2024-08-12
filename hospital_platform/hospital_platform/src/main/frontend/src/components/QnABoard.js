import React from "react";
import './QnABoard.css';

const QnABoard = () => (
    <div className="qna-board">
        <h2>Q&A 게시판</h2>
        <div className="qa-items">
            <div>
                <h3>궁금증 해결</h3>
                <small>치과 진료와 관련된 다양한 질문을 올리고 전문가의 답변을 얻을 수 있습니다.</small>
            </div>
            <div>
                <h3>정보 공유</h3>
                <ul>
                    <li>치과 진료에 대한 유용한 정보를 서로 교류할 수 있습니다.</li>
                    <li>다른 사용자들의 경험을 배울 수 있습니다.</li>
                </ul>
            </div>
        </div>
    </div>
);

export default QnABoard;