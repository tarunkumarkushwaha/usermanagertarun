'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link"
import { Context } from '@/MyContext';
import { useContext } from 'react';
const BASE_URL = "https://reqres.in/api";

export default function Login() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loginclick, setloginclick] = useState(false);
  const [error, setError] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();

  const { Setuseremail } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/users");
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    </div>;
  }


  const handleLogin = async () => {
    try {
      setloginclick(true)
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      Setuseremail(email)
      localStorage.setItem("token", response.data.token);
      setloginclick(false)
      router.push("/users");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <button
        onClick={() => router.push('/')}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4m-2 2h12"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome to user manager</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            className="border rounded-md p-3 w-full focus:ring focus:outline-none border-grey-300 text-black transition-shadow duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </div>
        <div className="mb-6">
          <input
            className="border rounded-md p-3 w-full focus:ring focus:outline-none border-grey-300 text-black transition-shadow duration-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          className={` ${loginclick && "button-clicked"} cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300`}
          onClick={handleLogin}
        >
          {loginclick ? <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          </div> : "Sign In"}
        </button>
        <div className="mt-4 text-center">
          <Link href='/forgotpassword' className="text-sm text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors duration-200">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}