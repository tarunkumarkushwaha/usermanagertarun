import React from 'react';
import Link from 'next/link'

const NotFound = () => (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">

            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Page Not Found</h1>
            <p className="text-lg text-gray-700 mb-8">
                We couldn't find the page you were looking for.
            </p>
            <Link
                href="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
            >
                Go Back Home
            </Link>
        </div>
    </>
);

export default NotFound;