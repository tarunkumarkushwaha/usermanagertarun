'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

     const router = useRouter();

    const handleForgotPassword = async () => {
        try {
            setTimeout(() => {
                setSuccess('Password reset link sent to your email.');
                setError('');
                setEmail('');
            }, 1000);

        } catch (err) {
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 cursor-pointer flex items-center justify-center rounded-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 hover:text-blue-400 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
            </button>
            <div className="bg-white entry-animation p-8 rounded-2xl shadow-2xl w-96 transform transition-all hover:scale-101 duration-300">
                <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15v-.01M12 15h.01M9 15h.01M12 12a4 4 0 01-4-4V5a4 4 0 018 0v3a4 4 0 01-4 4z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Forgot Password?</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 smooth-entry text-center mb-4">{success}</p>}
                <div className="mb-6">
                    <input
                        className="border border-grey-300 text-black rounded-md p-3 w-full focus:outline-none transition-shadow duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300"
                    onClick={handleForgotPassword}
                >
                    Reset Password
                </button>
                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}