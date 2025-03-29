"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const EditUser = () => {
  const router = useRouter();
  const paramsPromise = useParams();
  const [id, setId] = useState(null);
  const [editclick, seteditclick] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const BASE_URL = "https://reqres.in/api";

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await paramsPromise;
      setId(resolvedParams.id);
    };
    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      seteditclick(true)
      await axios.put(`${BASE_URL}/users/${id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      seteditclick(false)
      router.push("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
      <div className="p-8 bg-gradient-to-br entry-animation w-96 from-indigo-50 to-purple-50 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Edit User Profile</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">First Name</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full border-gray-300 focus:outline-none text-gray-700 rounded-md shadow-sm p-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full border-gray-300 focus:outline-none text-gray-700 rounded-md shadow-sm p-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border-gray-300 focus:outline-none text-gray-700 rounded-md shadow-sm p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <button
            className={`bg-indigo-600 ${editclick && "button-clicked"} cursor-pointer hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md w-full transition-colors duration-300`}
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

