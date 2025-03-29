"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Context } from '@/MyContext';
import { useContext } from 'react';
import { toast } from "react-toastify";

const Users = () => {
  const [page, setPage] = useState(1);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const BASE_URL = "https://reqres.in/api";

  const { users, setUsers, useremail } = useContext(Context);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success(`user ${useremail} logged out`)
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (isAuthChecked) {
      const fetchUsers = async () => {
        try {
          if (users.length === 0) {
            const response = await axios.get(`${BASE_URL}/users?page=${page}`);
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
            console.log("i m running")
          } else {
            console.log("prefetched from cache")
            return
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }
  }, [page, isAuthChecked]);

  if (!isAuthChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    </div>;
  }

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
    let username = users.filter(user => user.id == id)[0].first_name

    // console.log(username)
    toast.success(`user ${username} deleted`)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
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
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg entry-animation">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">User Directory</h2>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-md transition">
            Logout
          </button>
        </div>

        <div className="overflow-x-auto ">
          <table className="min-w-full border-collapse bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-center font-semibold text-gray-700">Avatar</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition text-center">
                  <td className="py-3 px-4 flex justify-center items-center">
                    <img src={user.avatar} alt={user.first_name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="py-3 px-4 text-gray-700">{user.first_name} {user.last_name}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white py-1 px-3 rounded-md transition"
                        onClick={() => router.push(`/edit/${user.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white py-1 px-3 rounded-md transition"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
                :
                <tr>
                  <td colSpan="3" className="py-10 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-800"></div>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>


        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="text-gray-700 text-sm">Page {page} of {totalPages}</span>
          <button
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>

  );
};

export default Users;