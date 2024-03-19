import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <main className='py-20 bg-slate-200'>
      <App />
    </main>
    <Footer />
  </React.StrictMode>
);

