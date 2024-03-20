import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ActionProduct from './ActionProduct';

export default function Products({ product }) {
    const [orderModal, setOrderModal] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    async function orderProduct() {
        try {
            if (quantity) {
                await axios.post(`http://localhost:5000/api/order/${product.id}`, {
                    quantity
                }, { withCredentials: true });
                navigate('/orders');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };


    function showOrderModal() {
        setOrderModal(!orderModal);
    }

    return (
        <div className="w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-5 py-5">
                <h5 className="text-2xl tracking-tight font-bold text-gray-900 dark:text-white">{product.name}</h5>
                <div className="mt-2.5 mb-5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">Tersedia : {product.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Rp.{product.price}</span>
                    <button onClick={showOrderModal} data-modal-target="progress-modal" data-modal-toggle="progress-modal" className="text-white flex bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm sm:px-5 px-3 py-1 sm:py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg className="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>Pesan</button>
                    <div id="progress-modal" tabIndex="-1" aria-hidden="true" className={`${orderModal ? 'hidden' : ''} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={showOrderModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="progress-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5">
                                    <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                                    <span className="text-base font-normal">Available {product.quantity}</span>
                                    <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
                                        <div>
                                            <span className="text-base font-normal">Harga Rp.{product.price}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Total: Rp.{product.price * quantity}</span>
                                    </div>
                                    <div className='w-full my-3'>
                                        <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{quantity}</label>
                                        <input id="steps-range" onChange={handleQuantityChange} type="range" min="1" max={product.quantity} value={quantity} step="1" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                                    </div>
                                    <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                                        <button onClick={orderProduct} data-modal-hide="progress-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Order Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ActionProduct product={product} />
        </div>
    )
}