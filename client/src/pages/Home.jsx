import React, { useEffect } from 'react';
import Products from 'components/Card';
import InputModal from 'components/InputModal';
import { useCookies } from 'react-cookie';
import { useData } from 'utils/fetchProducts';

function Home() {
  const { data, fetchData } = useData();
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    if (cookies.isLoggedIn) {
      fetchData();
    }
  }, []);

  return (
    <div className="w-full">
      <section className="bg-white dark:bg-gray-900 mt-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Toqqo - Simple Product Manager</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Order and Create Your Products</p>
          {
            !cookies.isLoggedIn && (
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a href="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                  Register
                  <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
                <a href="login" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
                  Login
                </a>
              </div>
            )
          }
        </div>
      </section>
      <section className="py-10 dark:bg-gray-900 text-center">
        {cookies.isLoggedIn &&
          <div>
            <h2 className='text-center text-3xl font-bold'>Daftar Product</h2>
            <InputModal />
            <div className="py-8 gap-3 px-4 mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center lg:py-16">
              {
                data.map((product) => {
                  return (
                    <Products product={product} key={product.id} />
                  )
                })
              }
            </div>
          </div>
        }
      </section>
    </div>
  );
}

export default Home;
