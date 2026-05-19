import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This links your Tailwind styles
import './globals.css'; // This links your custom global styles
import App from './App'; // This links your Dashboard logic

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);