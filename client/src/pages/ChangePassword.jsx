import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
    const password = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
    const [passwords, setPasswords] = useState({ ...password });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put('http://localhost:5000/api/user/password', {
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword,
        }, { withCredentials: true, credentials: 'include', }).then(async (res) => {
            setPasswords({ ...password })
            setMessage(res.data.message);
        }).catch(function (err) {
            setMessage(err.response.data.message);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    return (
        <div>
            <h2 className='text-center mb-7 text-2xl'>Change Password</h2>
            <form onSubmit={handleSubmit} className="max-w-sm px-10 mx-auto">
                {
                    message &&
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        {message}
                    </div>
                }
                <div className="mb-5">
                    <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Old Password</label>
                    <input type="password" id="oldpassword" name="oldPassword" value={passwords.oldPassword} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
                    <input type="password" id="newpassword" name="newPassword" value={passwords.newPassword} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                    <input type="password" id="confirmpassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );
}
