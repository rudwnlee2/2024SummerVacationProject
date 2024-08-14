import React, { useState, useEffect } from 'react';
import dentistData from '../data/dentistData.json'; // JSON 파일의 경로를 적절히 수정해주세요

function DentistList() {
    const [dentists, setDentists] = useState([]);

    useEffect(() => {
        setDentists(dentistData);
    }, []);

    return (
        <div>
            <h1>치과 목록</h1>
            <table>
                <thead>
                <tr>
                    <th>지역</th>
                    <th>치과명</th>
                    <th>면허 날짜</th>
                    <th>영업 상태</th>
                    <th>주소</th>
                    <th>우편번호</th>
                    <th>경도</th>
                    <th>위도</th>
                </tr>
                </thead>
                <tbody>
                {dentists.map((dentist, index) => (
                    <tr key={index}>
                        <td>{dentist.SIGUN_NM}</td>
                        <td>{dentist.BIZPLC_NM}</td>
                        <td>{dentist.LICENSG_DE}</td>
                        <td>{dentist.BSN_STATE_NM}</td>
                        <td>{dentist.REFINE_ROADNM_ADDR}</td>
                        <td>{dentist.REFINE_ZIPNO}</td>
                        <td>{dentist.REFINE_WGS84_LAT}</td>
                        <td>{dentist.REFINE_WGS84_LOGT}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DentistList;