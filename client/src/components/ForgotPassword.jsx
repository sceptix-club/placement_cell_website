'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import supabase from '@/data/supabase';



const Forgot = () => {
  
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRegex = /@sjec\.ac\.in/;
    const handleSendEmail = async() => {
        if (email.trim() === '') {
            setErrorMessage('Invalid Credentials: Email cannot be empty or incorrect.');
            return;
        }
        else if (!emailRegex.test(email)) {
            setErrorMessage('Invalid Credentials: Entered Email is Incorrect');
            return;
        }
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.href}`
        })
        if (data) {
            console.log(data, error)
        }

        setErrorMessage('check your email id');

    };
    const handleKeyPress = (e)=>{
        if(e.key === 'Enter'){
            handleSendEmail();
    }
}

    return (
        <div className="flex items-center justify-center font-sans h-screen  bg-[#222222]">
            <div className="bg-white  p-6  rounded shadow-md md:max-w-md lg:max-w-lg xl:max-w-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Account Details</h2>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border-2 text-black border-gray-300 rounded py-2 px-3 text-sm"
                        value={email}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                    />
                </div>




                <button
                    type="button"
                    className={`bg-green-700 text-white py-2 px-3 w-full justify-center rounded  mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${otpSent ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                    onClick={handleSendEmail}
                
                >
                    Send Email
                </button>

                {errorMessage && <p className="text-red-500 mb-5  text-center">{errorMessage}</p>}
            </div>
        </div >
    );
};

export default Forgot;


