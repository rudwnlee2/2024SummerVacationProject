import React, { useState } from 'react';

const Post = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [isReview, setIsReview] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isReview && !hospitalName) {
            alert('Hospital name is required for reviews.');
            return;
        }
        addPost({ title, author, hospitalName, isReview, content });
        setTitle('');
        setAuthor('');
        setHospitalName('');
        setIsReview(false);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div>
                <label>Title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Author: </label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Hospital Name: </label>
                <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    required={isReview}
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isReview}
                        onChange={(e) => setIsReview(e.target.checked)}
                    />
                    Is this a review?
                </label>
            </div>
            <div>
                <label>Content: </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit Post</button>
        </form>
    );
};

export default Post;