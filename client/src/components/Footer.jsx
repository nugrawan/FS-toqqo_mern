import { useCookies } from "react-cookie";
export default function Footer() {
    const [cookies] = useCookies();
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="self-center text-3xl text-blue-500 font-bold whitespace-nowrap dark:text-white">Toqqo</h1>

                    {
                        cookies.isLoggedIn &&
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="/orders" className="hover:underline me-4 md:me-6">Orders</a>
                            </li>
                            <li>
                                <a href="/login" className="hover:underline">Login</a>
                            </li>
                            <li>
                                <a href="/register" className="hover:underline">Register</a>
                            </li>
                        </ul>
                    }
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Nugrawan</a>. All Rights Reserved.</span>
            </div>
        </footer>


    );
}