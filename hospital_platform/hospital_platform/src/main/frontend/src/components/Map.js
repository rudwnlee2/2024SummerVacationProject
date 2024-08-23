// src/components/CommunityPage.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlueCircle from '../images/bluecircle.png';
import MyLocation from '../images/mylocation.png';

const Map = () => {
    // 상태 관리
    const [searchKeyword, setSearchKeyword] = useState('');
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    // ref 관리
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const currentLocationMarkerRef = useRef(null);
    const markersAndInfowindowsRef = useRef([]);

    const navigate = useNavigate();
    const location = useLocation();

    // 후기 게시판으로 이동하는 함수
    const navigateToReview = useCallback((placeId, placeName) => {
        console.log("Moving to review page for:", placeId, placeName);
        navigate('/ReviewPostCreate', {
            state: { hospitalId: placeId, hospitalName: placeName }
        });
    }, [navigate]);

    // 예약 페이지로 이동하는 함수
    const navigateToReservation = useCallback((placeId, placeName) => {
        console.log("Moving to reservation page for:", placeId, placeName);
        navigate('/reservation', {
            state: { hospitalId: placeId, hospitalName: placeName }
        });
    }, [navigate]);

    // 지도 초기화 및 이벤트 리스너 설정
    useEffect(() => {
        if (!mapInstanceRef.current) {
            initializeMap();
            getCurrentLocation();
        }

        setupGlobalFunctions();

        return cleanupFunction;
    }, []);

    // 지도 초기화
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

    // 현재 위치 가져오기
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

    // 장소 검색
    const searchPlaces = useCallback((page = 1) => {
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
    }, [searchKeyword, currentLocation]);

    // 검색 결과 마커 표시
    const displayMarkers = (places) => {
        const { kakao } = window;
        const bounds = new kakao.maps.LatLngBounds();

        const newMarkersAndInfowindows = places.map(place => {
            const coords = new kakao.maps.LatLng(place.y, place.x);
            const marker = new kakao.maps.Marker({
                map: mapInstanceRef.current,
                position: coords,
            });

            const infowindow = createInfoWindow(place);

            kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(mapInstanceRef.current, marker);
            });

            bounds.extend(coords);
            return { marker, infowindow };
        });

        markersAndInfowindowsRef.current = newMarkersAndInfowindows;
        mapInstanceRef.current.setBounds(bounds);
    };

    // 장소에 대한 인포윈도우 생성
    const createInfoWindow = (place) => {
        const { kakao } = window;
        const content = `
            <div style="padding:5px;font-size:12px;">
                <strong>${place.place_name}</strong><br/>
                <button onclick="window.openReviewPostCreate('${place.id}', '${place.place_name}')">후기 페이지로 이동하기</button>
                <button onclick="window.openReservationSystem('${place.id}', '${place.place_name}')">예약 페이지로 이동하기</button>
            </div>
        `;

        return new kakao.maps.InfoWindow({ content });
    };

    // 전역 함수 설정
    const setupGlobalFunctions = useCallback(() => {
        window.openReviewPostCreate = (placeId, placeName) => {
            navigateToReview(placeId, placeName);
        };
        window.openReservationSystem = (placeId, placeName) => {
            navigateToReservation(placeId, placeName);
        };
    }, [navigateToReview, navigateToReservation]);

    // 정리 함수
    const cleanupFunction = () => {
        markersAndInfowindowsRef.current.forEach(({ marker, infowindow }) => {
            marker.setMap(null);
            infowindow.close();
        });
        if (currentLocationMarkerRef.current) {
            currentLocationMarkerRef.current.setMap(null);
        }
        delete window.openReviewPostCreate;
        delete window.openReservationSystem;
    };

    // 장소 클릭 핸들러
    const handlePlaceClick = (place) => {
        setSelectedPlace(place);
        const { kakao } = window;
        const moveLatLon = new kakao.maps.LatLng(place.y, place.x);
        mapInstanceRef.current.panTo(moveLatLon);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            searchPlaces(newPage);
        }
    };

    // 현재 위치로 이동
    const moveToCurrentLocation = () => {
        if (currentLocation) {
            const { kakao } = window;
            const coords = new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);
            mapInstanceRef.current.setCenter(coords);
        } else {
            getCurrentLocation();
        }
    };

    // URL 파라미터 확인
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
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {places.map((place, index) => (
                            <li key={index} style={{
                                marginBottom: '10px',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                backgroundColor: selectedPlace && selectedPlace.id === place.id ? '#f0f0f0' : 'white'
                            }}
                                onClick={() => handlePlaceClick(place)}>
                                <strong>{place.place_name}</strong>
                                <br/>
                                {place.road_address_name || place.address_name}
                                <br/>
                                {place.phone}
                            </li>
                        ))}
                    </ul>
                    {selectedPlace && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <h3>{selectedPlace.place_name}</h3>
                            <button onClick={() => navigateToReview(selectedPlace.id, selectedPlace.place_name)} style={{ margin: '5px' }}>
                                후기페이지 작성
                            </button>
                            <button onClick={() => navigateToReservation(selectedPlace.id, selectedPlace.place_name)} style={{ margin: '5px' }}>
                                예약 페이지로 이동
                            </button>
                        </div>
                    )}
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

export default Map;