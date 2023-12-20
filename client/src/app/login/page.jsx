import React from "react";
import Link from 'next/link'

const login = () => {
  return (
    <>
      <h1>Placement cell website</h1>
      <div className="flex items-center  justify-center h-screen bg-gradient-to-r from-green-700 to-green-400">


        <div className="max-w-md w-full py-10 px-10 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl">
          <div className="px-6 py-8">

            <div className="font-bold text-2xl mb-5 font-serif text-gray-700 text-center "> Login to your account</div>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm  mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full  p-1 border rounded-md"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm  mb-2">
                  Password<Link href="/forgot" className="text-green-500 font-normal px-10">Forgot password?</Link>
                </label>

                <input
                  type="password"
                  id="password"
                  className="w-full p-1 border rounded-md"
                  placeholder="Enter your password"

                />

              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-700 py-2 text-white w-full rounded-md hover:bg-green-700 transition-all"
                >
                  Login
                </button>

              </div>
              <div className="flex px-9 text-sm text-black py-3">
                <span className="mr-4">Not a Student?</span>
                <Link href="/Mentor" className="text-green-500">Sign in as a Mentor</Link>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  );
};

export default login;
