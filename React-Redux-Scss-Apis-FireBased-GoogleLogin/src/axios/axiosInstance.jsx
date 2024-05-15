import axios from 'axios';

// Create an instance
const Instance = axios.create({
    baseURL: 'http://localhost:5000/api/', // Base URL for all requests
    // timeout: 2000, // Timeout in milliseconds
    // headers: {
    //     'Content-Type': 'application/json', // Default headers for all requests
    //     'Authorization': 'Bearer <your_token_here>'
    // },
});


export default Instance;

