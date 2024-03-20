import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [cookies, setCookie] = useCookies(['isLoggedIn']);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (formData.username.length < 3) {
            setMessage(`Panjang username setidaknya 3 karakter`);
        } else if (formData.password.length < 6) {
            setMessage(`Panjang password setidaknya 6 karakter`);
        } else {
            await axios.post('http://localhost:5000/api/user/login', {
                username: formData.username,
                password: formData.password,
            }, { withCredentials: true, credentials: 'include', }).then(async (res) => {
                setCookie('isLoggedIn', true);
                navigate('/');
            }).catch(function (err) {
                setMessage(err.response.data.message);
            });
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <div>
            <h2 className='text-center mb-7 text-2xl'>Login</h2>
            <form onSubmit={handleLogin} className="max-w-sm px-10 mx-auto">
                {
                    message &&
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        {message}
                    </div>
                }
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" min='6' id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                <p className='mt-5 text-center'>Belum punya akun? <a href="/register" className='text-blue-600'>Register</a></p>
            </form>
        </div>
    )
}
