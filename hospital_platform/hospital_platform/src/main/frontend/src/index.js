// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppointmentFeatures from './components/AppointmentFeatures';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <AppointmentFeatures />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();