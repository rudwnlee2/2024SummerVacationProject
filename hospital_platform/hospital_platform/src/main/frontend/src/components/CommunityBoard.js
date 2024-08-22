import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CommunityBoard.css';
import {Link} from "react-router-dom";

const CommunityBoard = () => {
    const [posts, setPosts] = useState([]); // 게시물 상태 관리

    // 모달 상태 추가
    const [isEditing, setIsEditing] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

// 수정 모달 열기 핸들러
    const handleEditClick = (post) => {
        setEditPostId(post.id);
        setEditTitle(post.title);
        setEditContent(post.content);
        setIsEditing(true);
    };

// 게시글 업데이트 핸들러
    const handleUpdatePost = async () => {
        await axios.put(`http://localhost:8080/api/freeboards/${editPostId}`, {
            title: editTitle,
            content: editContent
        });
        fetchPosts();  // 게시글 목록 새로고침
    };

    /*
    // 게시물 로드
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://localhost:8080/api/freeboards');
            setPosts(response.data);
        };
        fetchPosts();
    }, []);
    */
    // 게시물을 로드하는 함수 정의
    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:8080/api/freeboards');
        const cleanedPosts = response.data.map(post => ({
            ...post,
            title: post.title.trim(),   // 제목의 불필요한 공백 제거
            content: post.content.trim()  // 내용의 불필요한 공백 제거
        }));
        setPosts(cleanedPosts);
    };

    // 컴포넌트가 마운트될 때 게시물 로드
    useEffect(() => {
        fetchPosts();
    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실

    return (
        <>
            <div>
                <h1>커뮤니티 페이지</h1>
                <Link to="/AppointmentFeatures">
                    <button>메인으로 돌아가기</button>
                </Link>
                <Link to="/CommunityPostCreate">
                    <button>게시판 만들기</button>
                </Link>
                <Link to="/TestFile">
                    <button>테스트 페이지</button>
                </Link>
            </div>

            <div className="community-board">
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            {post.title} - {post.content}
                        </li>
                    ))}
                </ul>
            </div>


            <div className="community-board">
                <h2>커뮤니티 게시판</h2>
                {/* 게시물 목록을 반복하여 카드 컴포넌트로 생성 */}
                {posts.map(post => (
                    <div key={post.id} className="card">
                        <div className="card-header">
                            <img src="#" alt="Profile" />
                            <div>
                                <div className="name">권순광</div>
                                <div className="time-location">1시간 전, 서울시 금천구</div>
                            </div>
                            <div className="rating">
                                <span>★ 4.5/5.0</span>
                            </div>
                        </div>
                        <div className="card-content">
                            <Link to={`/FreeBoardDetails/${post.id}`}
                                  style={{textDecoration: 'none', color: 'inherit'}}>
                                <div className="title">
                                    <p>{post.title.trim()}</p> {/* post.title 사용 */}
                                </div>
                                <div className="content-p">
                                    <p>{post.content.trim()}</p> {/* post.content 사용 */}
                                </div>
                            </Link>
                            <span className="read-more">더보기</span>
                            <button onClick={() => handleEditClick(post)}>수정</button>
                            {isEditing && (
                                <div className="modal">
                                    <input type="text" value={editTitle}
                                           onChange={(e) => setEditTitle(e.target.value)}/>
                                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)}/>
                                    <button onClick={handleUpdatePost}>게시글 업데이트</button>
                                    <button onClick={() => setIsEditing(false)}>취소</button>
                                </div>
                            )}
                        </div>
                        <div className="card-images">
                        <div>사진1</div>
                            <div>사진2</div>
                            <div>사진3</div>
                        </div>
                        <div className="card-tags">
                            <span>서울시 금천구</span>
                            <span>충치</span>
                            <span>견적</span>
                            <span>태그4</span>
                            <span>태그5...</span>
                        </div>
                        <div className="card-footer">
                            <img className="post-icon" src="image/heart.png" alt="like-icon"/>
                            <img className="post-icon-comment" src="image/comment.png" alt="comment-icon"/>
                            <p className="comment-count">(0)</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="community-ex">
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

        </>
    );
};

export default CommunityBoard;