import React, { useState } from 'react';
import axios from 'axios';
import { useData } from 'utils/fetchProducts';

export default function ActionProduct({ product }) {
    const { fetchData } = useData();
    const [editModal, setEditModal] = useState(true);
    const [newProduct, setNewProduct] = useState({
        name: product.name,
        price: product.price,
        quantity: product.quantity
    })
    async function deleteProduct() {
        try {
            await axios.delete(`http://localhost:5000/api/products/${product.id}`, { withCredentials: true });
            await fetchData()
        } catch (error) {
            console.error(error);
        }
    }

    async function editProduct(e) {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/api/products/${product.id}`, {
                name: newProduct.name,
                price: newProduct.price,
                quantity: newProduct.quantity
            }, { withCredentials: true });
            setEditModal(!editModal);
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    function showEditModal() {
        setEditModal(!editModal);
    }

    return (
        <div className="text-xs p-3 text-right">
            <button onClick={showEditModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-sm px-4 py-2 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
            <button onClick={deleteProduct} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${editModal ? 'hidden' : ''} overflow-y-auto overflow-x-hidden fixed z-50 justify-center top-10 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Product
                            </h3>
                            <button onClick={showEditModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={editProduct} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2 text-start">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name" value={newProduct.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price(Rp)</label>
                                    <input type="number" min={1000} name="price" id="price" value={newProduct.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Harga" required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                    <input type="number" min={1} name="quantity" id="quantity" value={newProduct.quantity} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Quanitas" required />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Edit Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}