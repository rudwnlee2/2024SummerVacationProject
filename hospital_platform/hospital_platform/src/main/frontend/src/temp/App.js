// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import DentalPage from "./DentalPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="logo">Dental App</Link>
          <div className="header-buttons">
            {isLoggedIn ? (
              <>
                <button onClick={toggleLogin}>Logout</button>
                <button>My Page</button>
              </>
            ) : (
              <button onClick={toggleLogin}>Login</button>
            )}
          </div>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/dental">치과</Link>
            </li>
            <li>
              <Link to="/">치과게시판</Link>
            </li>
            <li>자유게시판</li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dental" element={<DentalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
