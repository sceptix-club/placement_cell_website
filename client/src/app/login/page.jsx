"use client";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import supabase from "../../data/supabase";
import { useContext } from "react";
import { LoginContext } from "@/context";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  //   const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();
  useEffect(() => {
    const checkUserStatus = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session !== null) {
        document.cookie = `accessToken=${data.session.access_token}; path=/`;
        document.cookie = `refreshToken=${data.session.refresh_token}; path=/`;
        router.push("/profile");
        setIsLoggedIn(true);
      }
    };
    checkUserStatus();
  }, []);

  const handleLogin = () => {
    const emailRegex = /@sjec\.ac\.in/;

    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage(
        "Invalid Credentials: Email and password cannot be empty."
      );
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Invalid Credentials: Entered email is incorrect.");
    } else {
      // Perform login logic here
      setErrorMessage(""); // Clear error message if login is successful
      console.log(`Logging in with email: ${email} and password: ${password}`);
      const handlelogin = async () => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (data.session !== null) {
            document.cookie = `accessToken=${data.session.access_token}; path=/`;
            document.cookie = `refreshToken=${data.session.refresh_token}; path=/`;
            setIsLoggedIn(true);
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };

      handlelogin();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen font-sans bg-[#222222] ">
        <div className="bg-white p-10 rounded shadow-md w-96 hover-shadow md:max-w-md lg:max-w-lg xl:max-w-xl">
          <h2 className="text-2xl font-semibold mb-6  text-black text-center">
            Login to your account
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-2 border-black rounded py-2 px-3 text-sm text-black bg-white"
              onKeyPress={handleKeyPress}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full  border-2 border-black rounded py-2 px-3 text-sm text-black bg-white"
              onKeyPress={handleKeyPress}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-3/4 right-3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <FaRegEye className="h-6 w-6 text-gray-500" />
              ) : (
                <FaEyeSlash className="h-6 w-6 text-gray-500" />
              )}
            </button>
            <Link
              href="/forgot"
              className="text-green-500 text-sm absolute top-0 right-0 mt-1 mr-1  "
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className=" text-white py-2 px-4 rounded w-full mb-4 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 "
            onClick={handleLogin}
          >
            Login
          </button>
          {errorMessage && (
            <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default login;
