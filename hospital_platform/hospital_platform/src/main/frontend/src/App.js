import React from 'react';
import { Routes, Route } from "react-router-dom";
import HeroSection from './components/HeroSection';
import TreatmentInfo from './components/TreatmentInfo';
import AppointmentFeatures from './components/AppointmentFeatures';
import TreatmentHistory from './components/TreatmentHistory';
import FeeCalculator from './components/FeeCalculator';
import ConsultationFeature from './components/ConsultationFeature';
import CommunityBoard from './components/CommunityBoard';
import ReviewSharing from './components/ReviewSharing';
import QnABoard from './components/QnABoard';
import EventsPromotion from './components/EventsPromotion';
import CommunityPage from './components/CommunityPage';
import DentistList from './components/DentistList';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/HeroSection" element={<HeroSection />} />
            <Route path="/TreatmentInfo" element={<TreatmentInfo />} />
            <Route path="/AppointmentFeatures" element={<AppointmentFeatures />} />
            <Route path="/TreatmentHistory" element={<TreatmentHistory />} />
            <Route path="/FeeCalculator" element={<FeeCalculator />} />
            <Route path="/ConsultationFeature" element={<ConsultationFeature />} />
            <Route path="/CommunityBoard" element={<CommunityBoard />} />
            <Route path="/ReviewSharing" element={<ReviewSharing />} />
            <Route path="/QnABoard" element={<QnABoard />} />
            <Route path="/EventsPromotion" element={<EventsPromotion />} />
            <Route path="/Community" element={<CommunityPage />} />
            <Route path="/Dentistlist" element={<DentistList />} />
        </Routes>
    );
}

export default App;
