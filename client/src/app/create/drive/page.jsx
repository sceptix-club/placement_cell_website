



"use client";

import React, { useState } from "react";
import supabase from "@/data/supabase";

const create = () => {
  const [submitData, setSubmitData] = useState({
    name: "",
    company: "",
    description: "",
    date: "",
    que1: "",
    que2: "",
    que3: "",
    que4: "",
  });
  const [pdfFile, setPdfFile] = useState(null);

  const [questionInputs, setQuestionInputs] = useState(Array(4).fill(""));
  const [numberOfQuestions, setNumberOfQuestions] = useState(4);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);

    // Store the full filename with extension in state
    setSubmitData((prev) => ({
      ...prev,
      pdfFileName: file ? file.name : "", // Store the full filename or an empty string if no file is selected
    }));
  };

  const handleQuestionInputChange = (index, value) => {
    const newQuestionInputs = [...questionInputs];
    newQuestionInputs[index] = value;
    setQuestionInputs(newQuestionInputs);
    setSubmitData((prev) => ({
      ...prev,
      [`que${index + 1}`]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload PDF file to Supabase Storage
    let fileURL = null;
    if (pdfFile) {
      const { data: uploadedFile, error: uploadError } = await supabase.storage
        .from("Drive_Doc")
        .upload(`public/${pdfFile.name}`, pdfFile, {
          cacheControl: "3600",
        });

      if (uploadError) {
        console.error("Error uploading PDF file:", uploadError.message);
        return;
      }

      // Generate URL for the uploaded file
      const fileName = submitData.pdfFileName;
      const { data: urlData, error: urlError } = await supabase.storage
        .from("Drive_Doc")
        .getPublicUrl(`public/${fileName}`);

      if (urlError) {
        console.error(
          "Error generating URL for uploaded file:",
          urlError.message
        );
        return;
      }

      const timestamp = new Date().toISOString();
      fileURL = `${urlData.publicUrl}?t=${encodeURIComponent(timestamp)}`;
      console.log("PDF file uploaded successfully:", fileURL);
    }

    // Prepare data to be saved
    const dataToSave = {
      ...submitData,
      pdfFileURL: fileURL,
    };

    // Save data to Supabase database
    try {
      const { data: insertedData, error: insertError } = await supabase
        // .schema("placements")
        .from("drive")
        .insert([dataToSave]);

      if (insertError) {
        console.error("Error saving placement:", insertError.message);
        return;
      }
      alert("New drive successfully created!");

      console.log("Placement saved successfully:", insertedData);
      setSubmitData({
        name: "",
        company: "",
        description: "",
        date: "",
        que1: "",
        que2: "",
        que3: "",
        que4: "",
      });
      setPdfFile(null);
      setQuestionInputs(Array(4).fill(""));
    } catch (error) {
      console.error("Error saving placement:", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#222222]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen font-sans bg-[#222222]">
        <div className="bg-white p-10 rounded shadow-md w-96 hover-shadow md:max-w-md lg:max-w-lg xl:max-w-xl">
          <h2 className="text-2xl font-semibold mb-6 text-black text-center">
            Login to your account
          </h2> 
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-2 border-black rounded py-2 px-3 text-sm text-black"
              onKeyPress={handleKeyPress}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full border-2 border-black rounded py-2 px-3 text-sm text-black"
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
              className="text-green-500 text-sm absolute top-0 right-0 mt-1 mr-1"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`text-white py-2 px-4 rounded w-full mb-4 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : (
              "Login"
            )}
          </button>
          {errorMessage && (
            <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
