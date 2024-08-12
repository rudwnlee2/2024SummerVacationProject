import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM from 'react-dom/client'로 변경
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import AppointmentFeatures from './components/AppointmentFeatures';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot 사용

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/appointment-features" element={<AppointmentFeatures />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
