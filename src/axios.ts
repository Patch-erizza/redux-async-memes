import axios from 'axios'

const axiosInstance = axios.create({
    headers: {
        withCredentials: true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

axiosInstance.defaults.headers.common['Host'] = 'memes.tmplr.keenetic.pro';

export default axiosInstance;