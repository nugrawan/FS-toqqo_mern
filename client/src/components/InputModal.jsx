import { useState } from "react";
import axios from 'axios';
import { useData } from 'utils/fetchProducts';
export default function InputModal() {
    const { fetchData } = useData();
    const [isHidden, setIsHidden] = useState(true);
    const [message, setMessage] = useState('');
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        quantity: 0,
    });

    async function addProduct(e) {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/products', {
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }, {
                withCredentials: true,
            }).then((res) => {
                setMessage(res.data.message);
                setIsHidden(!isHidden);
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            });
            await fetchData();
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const closeModal = () => {
        setIsHidden(!isHidden);
    }
    return (
        <>
            <button onClick={closeModal} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="text-gray-900 my-3 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Product</button>
            {
                message &&
                <div className="p-4 mx-20 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {message}
                </div>
            }
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isHidden ? 'hidden' : ''} overflow-y-auto overflow-x-hidden fixed z-50 justify-center top-10 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add New Product
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={addProduct} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2 text-start">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name" value={product.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (Rp)</label>
                                    <input type="number" min={1000} name="price" id="price" value={product.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Harga" required />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                    <input type="number" min={1} name="quantity" id="quantity" value={product.quantity} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Quanitas" required />
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}