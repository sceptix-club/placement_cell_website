'use client'
import React, { useState } from 'react';
import Link from 'next/link';


const Forgot = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRegex = /@sjec\.ac\.in/;
    const handleSendOtp = () => {
        if (email.trim() === '') {
            setErrorMessage('Invalid Credentials: Email cannot be empty or incorrect.');
            return;
        }
        else if (!emailRegex.test(email)) {
            setErrorMessage('Invalid Credentials: Entered Email is Incorrect');
            return;



        }

        setErrorMessage('');
        setOtpSent(true);
        console.log(`OTP Sent to ${email}`);
    };

    const handleVerifyOtp = () => {
        if (otp.trim() === '' || !/^\d{6}$/.test(otp)) {
            setErrorMessage('Invalid OTP: Please enter a valid 6-digit OTP.');
            return;
        }

        setErrorMessage('');
        console.log(`Verified OTP: ${otp}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            otpSent ? handleVerifyOtp() : handleSendOtp();
        }
    };

    return (
        <div className="flex items-center justify-center font-sans h-screen md:max-w-md lg:max-w-lg xl:max-w-xl bg-[#222222]">
            <div className="bg-white  p-6 rounded shadow-md  w-96">
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
                    onClick={handleSendOtp}
                    disabled={otpSent}
                >
                    {otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>

                {otpSent && (
                    <div className="flex mb-4">
                        <div className="mr-2">
                            <label htmlFor="otp" className="block text-gray-600 text-sm font-bold mb-2">Enter 6-Digit OTP Sent To Your Email</label>
                            <input
                                type="text"
                                id="otp"
                                className=" w-32 border-2 border-gray-300 rounded py-2 px-3 mt-2 text-sm text-black"
                                value={otp}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setOtp(e.target.value)}

                            />
                        </div>




                        <button
                            type="button"
                            className=" bg-green-700 text-white py-2 px-2 rounded w-96  mb-4 mt-14 ml-2 mr-20  content-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            onClick={otpSent ? handleVerifyOtp : handleSendOtp}



                        >
                            <label htmlFor="verify" className="py-1 text-sm">Verify OTP</label>


                        </button>
                    </div>

                )}

                {errorMessage && <p className="text-red-500 mb-5  text-center">{errorMessage}</p>}
            </div>
        </div >
    );
};

export default Forgot;


