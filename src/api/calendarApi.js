import axios from 'axios';




const calendarApi = axios.create({
    baseURL: 'https://calendar-app-backend-production-f1a3.up.railway.app/',
});

calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
})


export default calendarApi;
