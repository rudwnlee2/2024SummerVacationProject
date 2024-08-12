/*

import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
);
}

export default App;

*/

// src/App.js
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
        </Routes>
    );
}

export default App;
