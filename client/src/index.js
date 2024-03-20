import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { CookiesProvider } from 'react-cookie';
import { DataProvider } from 'utils/fetchProducts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <DataProvider>
        <Navbar />
        <main className='py-20 bg-slate-200'>
          <App />
        </main>
        <Footer />
      </DataProvider>
    </CookiesProvider>
  </React.StrictMode>
);

