import React, { useState } from 'react';
// import axios from 'axios';
import {Link} from "react-router-dom";

function PostCreator() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div>
            <form>
                <label>
                    제목:
                    <input
                        type="text"
                        placeholder="제목을 입력해 주세요."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <p>{title}</p>
                <label>
                    내용:
                    <textarea
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </label>
                <p>{content}</p>
            </form>
            <Link to="/CommunityBoard">
                <button>커뮤니티 페이지</button>
            </Link>
        </div>
    );
}

export default PostCreator;