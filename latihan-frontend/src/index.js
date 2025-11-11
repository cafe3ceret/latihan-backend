import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Buat root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render aplikasi React ke dalam root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
