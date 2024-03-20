import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState('');
    const [process, setProcess] = useState(true);

    async function getOrders() {
        await axios.get(`http://localhost:5000/api/order`, {
            withCredentials: true,
        }).then((response) => {
            setName(response.data.name);
            setOrders(response.data.orders);
        }).catch((error) => {
            console.log('Kesalahgan terjadi : ' + error);
        })
    }

    async function processOrder(id) {
        await axios.put(`http://localhost:5000/api/order/${id}`, {
            isProcessed: process
        }, {
            withCredentials: true,
        })
    }

    async function changeProcess(id, status) {
        setProcess(!status)
        await processOrder(id);
        await getOrders();
    }

    useEffect(() => {
        getOrders();
    }, []);

    const Products = ({ product }) => {
        return (
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {name}
                    </th>
                    <td className="px-6 py-4">
                        {product.quantity}
                    </td>
                    <td className="px-6 py-4">
                        Rp.{product.total}
                    </td>
                    <td className="px-6 py-4">
                        {moment(product.createdAt).calendar()}
                    </td>
                    <td className="px-6 py-4 grid">
                        {product.isProcessed ?
                            <button onClick={(e) => changeProcess(product.id, product.isProcessed)} type="button" className="grid-cols-1 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Diproses</button> :
                            <button onClick={(e) => changeProcess(product.id, product.isProcessed)} type="button" className="grid-cols-1 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Selesai</button>
                        }
                    </td>
                </tr>
            </tbody>
        )
    }
    return (
        <section className='w-4/5 mx-auto'>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah dipesan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal order
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    {
                        orders.map((product) => {
                            return (
                                <Products
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })
                    }
                </table>
            </div>
        </section>
    );
}
