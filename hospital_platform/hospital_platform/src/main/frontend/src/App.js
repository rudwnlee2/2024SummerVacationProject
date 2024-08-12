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
        <div className="App">
            <HeroSection />
            <TreatmentInfo />
            <AppointmentFeatures />
            <TreatmentHistory />
            <FeeCalculator />
            <ConsultationFeature />
            <CommunityBoard />
            <ReviewSharing />
            <QnABoard />
            <EventsPromotion />
        </div>
    );
}

export default App;
