"use client";

import React, { useState, useEffect } from "react";
import supabase from "@/data/supabase";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
const CreateDrivePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateDriveForm />
    </Suspense>
  );
};


const CreateDriveForm = (props) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const pathName = usePathname();


  const [submitData, setSubmitData] = useState({
    name: "",
    company: "",
    description: "",
    date: "",
    que1: "",
    que2: "",
    que3: "",
    que4: "",
    pdfFileName: "",

  });
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);

  const [questionInputs, setQuestionInputs] = useState(Array(4).fill(""));
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [driveId, setDriveId] = useState(null)
  useEffect(() => {
    const editMode = searchParams.get("isEditMode");
    const pathno = searchParams.get("pathNo");

    console.log("Extracted drive ID:", pathno);


    setIsEditMode(editMode === "true");
    if (editMode === "true" && pathno) {
      setDriveId(pathno);
      fetchDriveDetails(pathno);
    } else {
      resetFormFields();
    }

  }, [searchParams]);

  const fetchDriveDetails = async (driveId) => {
    try {
      const { data, error } = await supabase
        .from("drive")
        .select("*")
        .eq("id", driveId)
        .single();

      if (error) {
        toast.error("Error fetching drive details.");
        return;
      }

      setSubmitData({
        name: data.name || "",
        company: data.company || "",
        description: data.description || "",
        date: data.date || "",
        que1: data.que1 || "",
        que2: data.que2 || "",
        que3: data.que3 || "",
        que4: data.que4 || "",
        pdfFileName: data.pdfFileName || "",

      });


      setQuestionInputs([
        data.que1 || "",
        data.que2 || "",
        data.que3 || "",
        data.que4 || "",
      ]);

      setNumberOfQuestions(
        [data.que1, data.que2, data.que3, data.que4].filter((q) => q).length
      );
      if (data.pdfFileName) {
        fetchPDFFile(data.pdfFileName);
      }

    } catch (error) {
      toast.error("Error fetching drive details.");
      console.error(error);
    }
  }
  const fetchPDFFile = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from("Drive_Doc")
        .getPublicUrl(`public/${fileName}`);

      if (error) {
        console.error("Error fetching PDF file:", error.message);
        toast.error("Error fetching PDF file.");
        return;
      }

      // Handle the PDF file data as needed
      console.log("PDF file fetched successfully:", data.publicUrl);

      // Extract filename from the URL
      const url = new URL(data.publicUrl);
      const pathComponents = url.pathname.split('/');
      const filename = pathComponents[pathComponents.length - 1];

      console.log("Filename:", filename);
      setPdfURL(data.publicUrl);

      // You can set this filename to state or use it as required
    } catch (error) {
      console.error("Error fetching PDF file:", error.message);
      toast.error("Error fetching PDF file.");
    }
  };
  const resetFormFields = () => {
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
    setNumberOfQuestions(0);
  };


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
    if (isEditMode) {
      // Fetch PDF details if in edit mode
      fetchPDFFile(file ? file.name : "");
    }
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
        toast.error(`PDF Error: ${uploadError.message}`);
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
        toast.error(
          "Error generating URL for uploaded file.",
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
      if (isEditMode) {
        const { data: updatedData, error: updateError } = await supabase
          .from("drive")
          .update(dataToSave)
          .eq("id", driveId);

        if (updateError) {
          console.error("Error updating placement:", updateError.message);
          toast.error(`Error: ${updateError.message}`);
          return;
        }

        toast.success("Placement updated successfully");
      } else {
        const { data: insertedData, error: insertError } = await supabase
          .from("drive")
          .insert([dataToSave]);

        if (insertError) {
          console.error("Error saving placement:", insertError.message);
          toast.error(`Error: ${insertError.message}`);
          return;
        }

        toast.success("Placement saved successfully");
      }

      if (isEditMode) {
        router.push(`/drive/${driveId}`);
      } else {
        router.push("/");
      }

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
      setNumberOfQuestions(0);
    } catch (error) {
      console.error("Error saving placement:", error.message);
      toast.error(`Error saving drive. ${error.message}`);
    }
  };



  const isQuestionInputDisabled =
    Object.values(submitData).filter(
      (val) => typeof val === "string" && val.startsWith("que")
    ).length >= numberOfQuestions;

  return (
    <div className="flex justify-center items-center h-auto py-10 mb-10 font-gabarito">
      <section className="w-10/12  sm:w-sm md:w-md lg:w-lg h-auto p-4 sm:p-8 md:p-12 bg-primary-card rounded-md">
        <h2 className=" text-2xl sm:text-3xl md:text-4xl font-bold text-divider-color mb-8">
          {isEditMode ? "Edit Drive" : "Create a Draft"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label
            className=" text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
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
            className=" text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
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
            className=" text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
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
            className=" text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
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
            className=" text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
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
          <div className="flex items-center">
            <input
              className="file-input file-input-success w-full max-w-xs mb-2"
              type="file"
              id="pdfFile"
              name="pdfFile"
              accept=".pdf"
              onChange={handleFileChange}

            />
            {isEditMode && submitData.pdfFileName && pdfURL && (
              <a
                href={pdfURL}
                target="_blank"
                className="ml-2 cursor-pointer"
              >
                {submitData.pdfFileName}
              </a>
            )}
          </div>


          <label
            className=" text-lg sm:text-xl md:text-2xl font-medium text-divider-color"
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
            {[0, 1, 2, 3, 4].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
          {questionInputs.map(
            (questionInput, index) =>
              numberOfQuestions > 0 && (
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
              )
          )}
          <div className="flex justify-center w-32 h-10">
            <button
              className="font-medium bg-logo-bg w-32 h-10 rounded-md"
              type="submit"
            >
              {isEditMode ? "Edit" : "Save"}
            </button>
          </div>
        </form>

      </section>
    </div>
  );
};

export default CreateDrivePage;