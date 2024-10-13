import axios from 'axios'

const axiosInstance = axios.create({
    headers: {
        withCredentials: true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;