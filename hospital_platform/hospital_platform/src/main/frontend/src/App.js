import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import CommunityBoard from './components/CommunityBoard';
import CommunityPage from './components/CommunityPage';
import DentistList from './components/DentistList';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to="/CommunityBoard" />} />
                <Route path="/CommunityBoard" element={<CommunityBoard />} />
                <Route path="/Community" element={<CommunityPage />} />
                <Route path="/Dentistlist" element={<DentistList />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;