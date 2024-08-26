import React from 'react';
import { Routes, Route, Navigate, Link } from "react-router-dom";  // Link 추가
import CommunityBoard from './components/CommunityBoard';
import CommunityPostCreate from './components/CommunityPostCreate';
import FreeBoardDetails from './components/FreeBoardDetails';
import ReviewBoard from "./components/ReviewBoard";
import ReviewPostCreate from "./components/ReviewPostCreate";
import ReviewBoardDetails from "./components/ReviewBoardDetails";
import Map from './components/Map';
import DentistList from './components/DentistList';
import TestFile from './components/TestFile';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import ReservationSystem from './components/ReservationSystem';
import ReservationList from "./components/ReservationList";
import ReservationForm from "./components/ReservationForm";  // 새로 추가

function App() {
    return (
        <div className="App">

            {/* 상단 바 */}
            <header className="App-header">
                <h1 className="App-title"></h1>
                <div className="login-button">
                    <Link to="/Login">Login</Link>
                </div>
            </header>

            {/* 메뉴바 */}
            <nav className="App-nav">
                <ul>
                    <li><Link to="/Map">지도</Link></li>
                    <li><Link to="/ReviewBoard">리뷰게시판</Link></li>
                    <li><Link to="/CommunityBoard">커뮤니티게시판</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Navigate to="/CommunityBoard" />} />
                <Route path="/CommunityBoard" element={<CommunityBoard />} />
                <Route path="/CommunityPostCreate" element={<CommunityPostCreate />} />
                <Route path="/FreeBoardDetails/:postId" element={<FreeBoardDetails />} />
                <Route path="/ReviewBoard" element={<ReviewBoard />} />
                <Route path="/ReviewPostCreate" element={<ReviewPostCreate />} />
                <Route path="/ReviewBoardDetails/:id" element={<ReviewBoardDetails />} />
                <Route path="/Map" element={<Map />} />
                <Route path="/Dentistlist" element={<DentistList />} />
                <Route path="/TestFile" element={<TestFile />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/ReservationSystem" element={<ReservationSystem />} />
                <Route path="/ReservationList" element={<ReservationList />} />
                <Route path="/ReservationForm" element={<ReservationForm />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
