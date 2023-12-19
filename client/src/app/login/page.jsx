import React from "react";
import Link from 'next/link'

const login = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-900 to-green-600">
        <div className="max-w-md w-full py-14 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl">
          <div className="px-6 py-8">
            <div className="font-bold text-3xl mb-5 font-serif text-gray-700 text-center ">Login to your account</div>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm  mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm  mb-2">
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"

                />
                <Link href="/forgot" className="text-green-400 font-normal">Forgot password?</Link>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-700 py-2 text-white w-full rounded-md hover:bg-green-700 transition-all"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  );
};

export default login;
