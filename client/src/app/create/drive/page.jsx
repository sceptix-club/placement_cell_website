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
        .schema("placements")
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

  const isQuestionInputDisabled =
    Object.values(submitData).filter(
      (val) => typeof val === "string" && val.startsWith("que")
    ).length >= numberOfQuestions;

  return (
    <div className="flex justify-center items-center h-auto py-10 mb-10">
      <section className="w-10/12  sm:w-sm md:w-md lg:w-lg h-auto p-4 sm:p-8 md:p-12 bg-primary-card rounded-md">
        <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold text-divider-color mb-8">
          Create a Draft
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="name"
          >
            Placement Name
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-white"
            type="text"
            id="name"
            name="name"
            placeholder="Enter Placement Name"
            value={submitData.name}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="company"
          >
            Company Name
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-white"
            type="text"
            id="company"
            name="company"
            placeholder="Enter Company Name"
            value={submitData.company}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="description"
          >
            Company Description
          </label>
          <textarea
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 placeholder-plcholder-text text-white resize-none"
            rows={6}
            type="text"
            id="description"
            name="description"
            placeholder="Enter Company Description"
            value={submitData.description}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="bg-secondary-card rounded-md px-5
            py-2 mb-5 text-white"
            type="date"
            id="date"
            name="date"
            value={submitData.date}
            onChange={handleInputChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="pdfFile"
          >
            Upload PDF
          </label>
          {/* <input
            className="mb-5 rounded-md"
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept=".pdf"
            onChange={handleFileChange}
          /> */}
          <input
            className="file-input file-input-success w-full max-w-xs mb-2"
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label
            className="font-inter text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
            htmlFor="pdfFile"
          >
            Ask Questions
          </label>
          <label>Select Number of Questions:</label>
          <select
            value={numberOfQuestions}
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setNumberOfQuestions(num);
              setQuestionInputs(Array(num).fill(""));
            }}
            className="bg-secondary-card rounded-md px-5 py-2 mb-5 text-white"
          >
            {[1, 2, 3, 4].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
          {questionInputs.map((questionInput, index) => (
            <div key={index}>
              <label>Question {index + 1}</label>
              <input
                type="text"
                value={questionInput}
                onChange={(e) =>
                  handleQuestionInputChange(index, e.target.value)
                }
                className="bg-secondary-card rounded-md px-5 py-2 ml-5 mb-5 text-white"
              />
            </div>
          ))}
          <div className="flex justify-center w-32 h-10">
            <button
              className="font-medium bg-logo-bg w-32 h-10 rounded-md "
              type="submit"
              disabled={isQuestionInputDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default create;
