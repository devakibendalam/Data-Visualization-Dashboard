import React from 'react';
import { createRoot } from 'react-dom/client'; 
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = 'http://localhost:5000';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
