
import React from "react";
import Link from 'next/link'

const login = () => {



  return (
    <>






      <div className="flex items-center justify-center h-screen ">
        <div className="bg-white p-10 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6  text-black text-center">Login to your account</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" className="w-full border rounded py-2 px-3" placeholder="Enter your email" />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
            <input type="password" id="password" className="w-full border rounded py-2 px-3" placeholder="Enter your password" />
            <Link href="/forgot" className="text-green-500 text-sm absolute top-0 right-0 mt-1 mr-1 ">Forgot Password?</Link>
          </div>

          <button className="bg-green-700 text-white py-2 px-4 rounded w-full mb-4" >Login</button>

          <p className="text-center text-gray-600 text-sm"><Link href="/mentor" className="text-green-500">Sign in as a Mentor</Link></p>
        </div>
      </div>




    </>
  );
};

export default login;
