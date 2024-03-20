import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (cookies.isLoggedIn) {
            fetchData()
        }
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                withCredentials: true,
            });
            setData(response.data.products)
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }

    };

    return (
        <DataContext.Provider value={{ data, fetchData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    return useContext(DataContext);
};
