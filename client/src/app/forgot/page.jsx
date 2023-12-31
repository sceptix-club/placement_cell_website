'use client'
import React, { useState } from 'react';

const OtpPage = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = () => {

        setOtpSent(true);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center text-black">Account Details</h2>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border-2 text-black border-gray-300 rounded py-2 px-3 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>


                <button
                    type="button"
                    className={`bg-blue-500 text-white py-2 px-4 rounded w-full mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${otpSent ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                    onClick={handleSendOtp}
                    disabled={otpSent}
                >
                    {otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
                {otpSent && (
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-gray-600 text-sm font-bold mb-2">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            className="w-full border-2 border-gray-300 rounded py-2 px-3 text-sm"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />
                    </div>
                )}


                {otpSent && (
                    <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-4 rounded w-full mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        onClick={handleVerifyOtp}
                    >
                        Verify OTP
                    </button>
                )}
            </div>
        </div>
    );
};

export default OtpPage;
