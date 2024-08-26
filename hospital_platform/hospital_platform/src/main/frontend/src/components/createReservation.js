import axios from 'axios';

export const createReservation = async (reservationData) => {
    const response = await axios.post('http://your-api-url/reservations', reservationData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};