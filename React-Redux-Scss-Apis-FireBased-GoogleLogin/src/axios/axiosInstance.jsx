import axios from 'axios';

// Create an instance :)
const Instance = axios.create({
    baseURL: 'https://unified-authentication.onrender.com/',     // Base URL for all requests :)
    // headers: {
    //     'Content-Type': 'application/json',                  // Default headers for all requests :)
    //     'Authorization': 'Bearer <your_token_here>'
    // },
});


export default Instance;

