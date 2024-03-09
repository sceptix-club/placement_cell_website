
'use client'
import React, { useState ,useEffect} from 'react';
import supabase from '@/data/supabase';
import { useRouter } from 'next/navigation';

const newPassword = () => {
    const router = useRouter();
    const [password,setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        const checkForUserStatus = async()=>{
            const {data,error} = await supabase.auth.getSession();
            if(data.session===null){
                router.push("/login");
            }
            console.log(data.session);
        }
        checkForUserStatus();     
    },[])
  
    const handleSubmit = async()=>{
        // write a code to check if the value in the password state and reEnteredPassword state are equal or not
        if (password === confirmPassword) {
            const { data, error } = await supabase.auth.updateUser({
                password: password,
            });
            if(data){
                console.log(data)
            }
    
} else {
    // The passwords do not match, you should display an error message.
    setErrorMessage('Passwords do not match.');
}


    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="flex items-center justify-center font-sans h-screen  bg-[#222222]">
            <div className="bg-white  p-6  rounded shadow-md md:max-w-md lg:max-w-lg xl:max-w-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Forgot Password</h2>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-600 text-sm font-bold mb-2">Email</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border-2 text-black border-gray-300 rounded py-2 px-3 text-sm"
                        // value={email}
                        onKeyPress={handleKeyPress}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder="Enter New Password"
                    />
                    <input
                        type="password"
                        id="password"
                        className="w-full border-2 text-black border-gray-300 rounded py-2 px-3 text-sm mt-5"
                        // value={email}
                        onKeyPress={handleKeyPress}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        placeholder="ReEnter Your Password"
                    />
                </div>

                <button
                    type="button"
                    className={`bg-green-700 text-white py-2 px-3 w-full justify-center rounded  mb-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 `}
                    onClick={handleSubmit}
                >
                    Submit
                    
                </button>
                {errorMessage && <p className="text-red-500 mb-5  text-center">{errorMessage}</p>}
            </div>
        </div >
    );
};

export default newPassword;



