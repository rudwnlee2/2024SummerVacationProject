// Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="dental-list">
        <h2>치과 리스트</h2>
        <div className="card-grid">
          <Link to="/dental">
            <div className="card">
              <img src="dental1.jpg" alt="치과 1" />
              <div className="card-content">
                <h3>치과 이름 1</h3>
              </div>
            </div>
          </Link>
          <Link to="/dental">
            <div className="card">
              <img src="dental2.jpg" alt="치과 2" />
              <div className="card-content">
                <h3>치과 이름 2</h3>
              </div>
            </div>
          </Link>
          <Link to="/dental">
            <div className="card">
              <img src="dental3.jpg" alt="치과 3" />
              <div className="card-content">
                <h3>치과 이름 3</h3>
              </div>
            </div>
          </Link>
          {/* 실제 데이터를 불러오려면 API 연동이 필요합니다 */}
        </div>
      </section>
    </main>
  );
}

export default Home;
