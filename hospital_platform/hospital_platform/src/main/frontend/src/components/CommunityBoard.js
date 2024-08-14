import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

const CommunityBoard = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
        setShowPostForm(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Community Board</h1>
            <button onClick={() => setShowPostForm(true)}>Add Post</button>

            {showPostForm && <Post addPost={addPost} />}

            <div style={{
                border: '1px solid black',
                padding: '10px',
                marginTop: '20px'
            }}>
                {posts.map((post, index) => (
                    <div key={index} style={{
                        border: '1px solid gray',
                        padding: '10px',
                        margin: '10px 0'
                    }}>
                        <h3>{post.title}</h3>
                        <p>Author: {post.author}</p>
                        {post.hospitalName && (
                            <p>Hospital:
                                <Link to={`/community?search=${encodeURIComponent(post.hospitalName)}`}
                                      onClick={() => console.log(`/community?search=${encodeURIComponent(post.hospitalName)}`)}>
                                    {post.hospitalName}
                                </Link>
                            </p>
                        )}
                        <p>Review: {post.isReview ? 'Yes' : 'No'}</p>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityBoard;