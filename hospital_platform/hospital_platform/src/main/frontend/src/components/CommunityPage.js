// src/components/CommunityPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import BlueCircle from '../images/bluecircle.png';
import MyLocation from '../images/mylocation.png';

const CommunityPage = () => {

    // 상태 관리
    const [searchKeyword, setSearchKeyword] = useState('');
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);

    // ref 관리
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const currentLocationMarkerRef = useRef(null);
    const markersAndInfowindowsRef = useRef([]);

    useEffect(() => {
        // 지도 초기화 및 현재 위치 설정
        if (!mapInstanceRef.current) {
            initializeMap();
            getCurrentLocation();
        }

        // 컴포넌트 언마운트 시 정리
        return () => {
            markersAndInfowindowsRef.current.forEach(({ marker, infowindow }) => {
                marker.setMap(null);
                infowindow.close();
            });
            if (currentLocationMarkerRef.current) {
                currentLocationMarkerRef.current.setMap(null);
            }
        };
    }, []);

    const initializeMap = () => {
        const { kakao } = window;
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 3,
        };

        const mapInstance = new kakao.maps.Map(container, options);
        mapInstanceRef.current = mapInstance;

        const zoomControl = new kakao.maps.ZoomControl();
        mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });

                const coords = new window.kakao.maps.LatLng(latitude, longitude);
                mapInstanceRef.current.setCenter(coords);

                currentLocationMarkerRef.current = new window.kakao.maps.Marker({
                    map: mapInstanceRef.current,
                    position: coords,
                    image: new window.kakao.maps.MarkerImage(
                        BlueCircle,
                        new window.kakao.maps.Size(15, 15),
                        { offset: new window.kakao.maps.Point(7.5, 7.5) }
                    ),
                });
            }, (error) => {
                console.error('Error getting current location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const searchPlaces = (page = 1) => {
        if (!mapRef.current || !searchKeyword.trim() || !currentLocation) return;

        const { kakao } = window;
        const ps = new kakao.maps.services.Places();

        // 이전 마커와 인포윈도우 제거
        markersAndInfowindowsRef.current.forEach(({ marker, infowindow }) => {
            marker.setMap(null);
            infowindow.close();
        });
        markersAndInfowindowsRef.current = [];

        const searchOptions = {
            page: page,
            size: 5,
            location: new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
            radius: 1000, // 1km 반경
        };

        ps.keywordSearch(searchKeyword, (data, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                setPlaces(data);
                displayMarkers(data);
                setCurrentPage(page);
                setTotalPages(pagination.last);
            } else {
                console.error('Failed to search places:', status);
            }
        }, searchOptions);
    };

    const displayMarkers = (places) => {
        const { kakao } = window;
        const bounds = new kakao.maps.LatLngBounds();

        const newMarkersAndInfowindows = places.map(place => {
            const coords = new kakao.maps.LatLng(place.y, place.x);
            const marker = new kakao.maps.Marker({
                map: mapInstanceRef.current,
                position: coords,
            });

            const infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
            });

            kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(mapInstanceRef.current, marker);
            });

            bounds.extend(coords);
            return { marker, infowindow };
        });

        markersAndInfowindowsRef.current = newMarkersAndInfowindows;
        mapInstanceRef.current.setBounds(bounds);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            searchPlaces(newPage);
        }
    };

    const moveToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const coords = new window.kakao.maps.LatLng(latitude, longitude);
                mapInstanceRef.current.setCenter(coords);
                setCurrentLocation({ lat: latitude, lng: longitude });

                if (currentLocationMarkerRef.current) {
                    currentLocationMarkerRef.current.setMap(null);
                }

                currentLocationMarkerRef.current = new window.kakao.maps.Marker({
                    map: mapInstanceRef.current,
                    position: coords,
                    image: new window.kakao.maps.MarkerImage(
                        BlueCircle,
                        new window.kakao.maps.Size(15, 15),
                        { offset: new window.kakao.maps.Point(7.5, 7.5) }
                    ),
                });
            }, (error) => {
                console.error('Error getting current location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    // URL 잘 받는지 useLocation을 통해 확인
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');

    console.log('Search Query:', searchQuery);

    return (
        <div>
            <h1>Community Posts</h1>
            <div style={{ display: 'flex', marginLeft: '30px', marginRight: '30px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="치과 검색"
                            style={{ padding: '5px', width: '300px' }}
                        />
                        <button onClick={() => searchPlaces(1)} style={{ marginLeft: '10px', padding: '5px' }}>
                            검색
                        </button>
                    </div>
                    <div
                        id="map"
                        ref={mapRef}
                        style={{
                            width: '100%',
                            height: '500px',
                        }}
                    ></div>
                    <img
                        src={MyLocation}
                        alt="현재 위치"
                        onClick={moveToCurrentLocation}
                        style={{
                            position: 'absolute',
                            top: '235px',
                            right: '4px',
                            zIndex: 1,
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            borderRadius: '5%',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                            padding: '5px',
                        }}
                    />
                </div>
                <div style={{flex: 1, marginLeft: '20px'}}>
                    <h2>검색된 치과 목록</h2>
                    <ul>
                        {places.map((place, index) => (
                            <li key={index} style={{marginBottom: '10px'}}>
                                <strong>{place.place_name}</strong>
                                <br/>
                                {place.road_address_name || place.address_name}
                                <br/>
                                {place.phone}
                                <br/>
                                좌표: ({place.x}, {place.y})
                            </li>
                        ))}
                    </ul>
                    {totalPages > 1 && (
                        <div style={{textAlign: "center", marginTop: '20px' }}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                이전
                            </button>
                            <span style={{ margin: '0 10px' }}>
                                페이지 {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                다음
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;