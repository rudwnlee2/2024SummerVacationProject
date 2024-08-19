import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import CommunityBoard from './components/CommunityBoard';
import CommunityPage from './components/CommunityPage';
import DentistList from './components/DentistList';
import CommunityPostCreate from './components/CommunityPostCreate';
import FreeBoardDetails from './components/FreeBoardDetails';
import TestFile from './components/TestFile';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to="/CommunityBoard" />} />
                <Route path="/CommunityBoard" element={<CommunityBoard />} />
                <Route path="/Community" element={<CommunityPage />} />
                <Route path="/Dentistlist" element={<DentistList />} />
                <Route path="/CommunityPostCreate" element={<CommunityPostCreate />} />
                <Route path="/FreeBoardDetails" element={<FreeBoardDetails />} />
                <Route path="/TestFile" element={<TestFile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;