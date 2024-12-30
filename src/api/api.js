import axios from 'axios';
const production = 'https://ridan-express-backend.onrender.com';
const api = axios.create({
    baseURL: `${production}/api`,
    withCredentials: true, // Ensure credentials are sent if using sessions/cookies
});

export default api;
