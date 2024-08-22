// Login.js
import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                email: formData.email,
                password: formData.password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            if (formData.rememberMe) {
                localStorage.setItem("rememberedEmail", formData.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            navigate("/communityBoard");
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message;
            setError(`로그인에 실패했습니다. ${errorMessage}`);
        }
    }

    React.useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setFormData((prevData) => ({ ...prevData, email: rememberedEmail, rememberMe: true }));
        }
    }, []);

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="login-header">
                    <h2>로그인</h2>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="아이디"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="options-container">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            아이디 저장
                        </label>
                    </div>
                    <button type="submit">로그인</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <div className="additional-links">
                    <Link to="/signup" className="link">회원가입</Link>
                    <Link to="/find-id-password" className="link">아이디/비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
