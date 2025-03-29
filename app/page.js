'use client';
import { useRouter } from "next/navigation";
import Image from 'next/image'; 

export default function Home() {
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="mb-8 ">
        <Image
          src="/user_management.png" 
          className="rounded-2xl w-auto h-auto"
          alt="User Management Illustration"
          width={200} 
          height={100} 
          priority
        />
      </div>
      <h1 className="text-gray-800 text-center text-4xl font-bold mb-6">
        Welcome to User Manager
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Streamline your user management with our intuitive platform.
      </p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 w-80" // Adjusted width
        onClick={handleLogin}
      >
        Get Started
      </button>
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Developed by Tarun
        </p>
      </div>
    </div>
  );
}

