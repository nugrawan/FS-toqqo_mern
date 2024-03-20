import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
export default function Navbar() {
    const [data, setData] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
    const [cookies, setCookies] = useCookies();

    async function logout() {
        if (cookies.isLoggedIn) {
            await axios.delete('http://localhost:5000/api/user', { withCredentials: true }).then((res) => {
                setCookies('isLoggedIn', false)
                window.location.replace('/');
            });
            setCookies('isLoggedIn', false);
        }
    }

    async function hiddenProfile() {
        setIsHidden(!isHidden);
    }

    async function fetchProfile() {
        try {
            if (cookies.isLoggedIn) {
                await axios.get('http://localhost:5000/api/user', { withCredentials: true }).then((res) => {
                    setData(res.data.profile);
                })
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [cookies.isLoggedIn]);

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/">
                        <h1 className="self-center text-3xl text-blue-500 font-bold whitespace-nowrap dark:text-white">Toqqo</h1>
                    </a>
                    {
                        cookies.isLoggedIn ? (
                            <div className='flex gap-5 items-center'>
                                <div className="relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                    <div id="avatarButton" onClick={hiddenProfile} data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" alt="User dropdown">
                                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                    <div id="userDropdown" className={`${isHidden ? 'hidden' : ''} z-10 absolute right-0 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <div>{data.firstName} {data.lastName}</div>
                                            <div className="font-medium truncate">@{data.username}</div>
                                            <div className="mt-2 opacity-80 text-xs">Join {data.createdAt}</div>
                                        </div>
                                        <ul className="text-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                            <li>
                                                <a href='/change-password' data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm py-1 inline-block px-2 mb-2 dark:focus:ring-yellow-900">Change password</a>
                                            </li>
                                            <li>
                                                <button type="button" onClick={logout} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                                <a href="/login" className=" text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                            </div>
                        )
                    }
                </div>
            </nav>
            {cookies.isLoggedIn && (
                <nav className="bg-gray-50 dark:bg-gray-700">
                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                <li>
                                    <a href="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="/orders" className="text-gray-900 dark:text-white hover:underline">My Orders</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    )
}
