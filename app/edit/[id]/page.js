"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from '@/MyContext';
import { useContext } from 'react';

const EditUser = () => {
  const [id, setId] = useState(null);
  const [editclick, setEditClick] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [errors, setErrors] = useState('');

  let userref = useRef(null)

  const router = useRouter();
  const params = useParams();
  const { users, setUsers } = useContext(Context);
  const BASE_URL = "https://reqres.in/api";

  const validate = () => {
    let newErrors = '';

    if (!firstName.trim()) newErrors = "First name is required.";
    if (!lastName.trim()) newErrors = "Last name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors = "Enter a valid email.";
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (isAuthChecked && params.id) {
      setId(params.id);
    }
  }, [isAuthChecked, params.id]);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        setFirstName(response.data.data.first_name);
        userref.current = response.data.data.first_name
        setLastName(response.data.data.last_name);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
    // console.log("i m running")
  }, [id]);

  const handleUpdate = async () => {
    if (!validate()) {
      toast.error(errors)
      return
    };
    try {
      setEditClick(true);
      await axios.put(`${BASE_URL}/users/${id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      setEditClick(false);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === Number(id) ? { ...user, first_name: firstName, last_name: lastName, email } : user
        );
        // console.log("Updated Users:", updatedUsers);
        return updatedUsers;
      });
      
      toast.success(`user ${userref.current} updated to ${firstName}`)
      router.push("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error)
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 min-h-screen">
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
      <div className="p-8 entry-animation w-96 bg-white rounded-2xl shadow-lg">
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

