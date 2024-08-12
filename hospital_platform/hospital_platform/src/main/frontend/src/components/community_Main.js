// community_Main.js

import React from 'react';
import './community_Main.css';
import { Link } from "react-router-dom";

function community_Main() {
    return (
        <>
            <div>
                <h1>커뮤니티 페이지</h1>
            </div>
            <Link to="/">
                <button>메인으로 돌아가기</button>
            </Link>
            <div className="community-container">
                <div className="community-header">
                    <div className="user-info">1시간 전, 권순광 · ⭐ 4.5/5.0</div>
                    <p className="main-content">금천구 라임치과 비용 견적 및 후기</p>
                </div>
                <div className="image-container">
                    <div className="image-placeholder"></div>
                    <div className="image-placeholder"></div>
                    <div className="image-placeholder"></div>
                </div>
                <div className="buttons-container">
                    <button className="like-button">좋아요</button>
                    <div>
                        <button className="comment-button">댓글</button>
                        <button className="tag-button">태그</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default community_Main;