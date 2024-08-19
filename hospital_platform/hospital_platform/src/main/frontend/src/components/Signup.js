import React, { useState } from "react";
import axios from "axios";
import './Signup.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        nickname: "",
        phoneNum: "",
        address1: "",
        address2: "",
        zipcode: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/signup", formData);
            alert("Sign up successful!");
            navigate("/login");
        } catch (error) {
            console.error("There was an error signing up!", error.response?.data || error.message);
            setError(`Sign up failed! ${error.response?.data || error.message}`);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <h2>회원가입</h2>
            </div>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phoneNum"
                    placeholder="Phone Number"
                    value={formData.phoneNum}
                    onChange={handleChange}
                    required
                />
                <div className="address-container">
                    <label>주소</label>
                    <input
                        type="text"
                        name="address1"
                        placeholder="Address1"
                        value={formData.address1}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address2"
                        placeholder="Address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="text"
                    name="zipcode"
                    placeholder="Zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    required
                />
                <button type="submit">회원가입</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default SignUp;
