import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
    const [error, setError] = useState(""); // 에러 메시지 상태 추가
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
            // 서버에 로그인 요청
            const response = await axios.post("http://localhost:8080/api/login", {
                email: formData.email,
                password: formData.password,
            });

            // 응답에서 JWT 토큰을 추출
            const token = response.data.token;

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("token", token);

            // 이메일 저장 옵션이 체크된 경우 이메일을 로컬 스토리지에 저장
            if (formData.rememberMe) {
                localStorage.setItem("rememberedEmail", formData.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            // 로그인 성공 시 메인 페이지로 이동
            alert("Login successful!");
            navigate("/communityBoard");
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);

            // 객체인 경우 JSON.stringify를 사용해 문자열로 변환하거나 특정 필드만 표시
            const errorMessage = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message;
            setError(`Login failed! ${errorMessage}`);
        }
    }

    // 페이지 로드 시 로컬 스토리지에서 이메일을 불러옴
    React.useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setFormData((prevData) => ({ ...prevData, email: rememberedEmail, rememberMe: true }));
        }
    }, []);

    return (
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
                {error && <p className="error-message">{error}</p>} {/* 에러 메시지 출력 */}
            </form>
            <div className="additional-links">
                <Link to="/signup" className="link">회원가입</Link>
                <Link to="/find-id-password" className="link">아이디/비밀번호 찾기</Link>
            </div>
        </div>
    );
}

export default Login;
