// DentalPage.js
import React, { useState } from "react";
import "./DentalPage.css";

function DentalPage() {
  const [selectedDental, setSelectedDental] = useState(null);

  const dentalList = [
    { id: 1, name: "치과 이름 1", info: "치과 정보 1", location: "위치 정보 1" },
    { id: 2, name: "치과 이름 2", info: "치과 정보 2", location: "위치 정보 2" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
    { id: 3, name: "치과 이름 3", info: "치과 정보 3", location: "위치 정보 3" },
  ];

  const handleDentalClick = (dental) => {
    setSelectedDental((prevSelected) =>
      prevSelected && prevSelected.id === dental.id ? null : dental
    );
  };

  return (
    <div className="dental-page">
      <div className="map">
        <img src="map-placeholder.png" alt="지도" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="dental-list">
        {dentalList.map((dental) => (
          <div key={dental.id} className="dental-item" onClick={() => handleDentalClick(dental)}>
            <h3>{dental.name}</h3>
            {selectedDental && selectedDental.id === dental.id && (
              <div className="dental-info">
                <p>{dental.info}</p>
                <p>{dental.location}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DentalPage;
