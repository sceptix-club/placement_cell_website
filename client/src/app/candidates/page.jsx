"use client";

import React, { useState, useEffect } from "react";
//Data to be displayed in the table
import CandidateTestData from "../../../public/CandidateTestData.js";
import Dropdown from "../../components/DropdownFilter.jsx";

//Filter options
const CGPA = ["5.0", "6.0", "7.0", "8.0", "9.0", "10.0"];
const Branch = ["CSE", "CSDS", "ECE", "EEE", "MECH", "CIVIL", "CSBS"];
const Skills = [
  "React",
  "Astro",
  "Baking",
  "Cooking",
  "Dancing",
  "Eating",
  "Fishing",
  "Gaming",
  "Hiking",
  "Jogging",
  "Kiting",
  "Lifting",
  "Meditating",
];

const candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranchOptions, setSelectedBranchOptions] = useState([]);
  const [selectedCGPAOptions, setSelectedCGPAOptions] = useState([]);
  const [selectedSkillsOptions, setSelectedSkillsOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //To handle the change in the selected options
  const handleBranchOptionChange = (optionValue, isChecked) => {
    if (isChecked) {
      setSelectedBranchOptions((prevOptions) => [...prevOptions, optionValue]);
    } else {
      setSelectedBranchOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionValue)
      );
    }
  };

  const handleCGPAOptionChange = (optionValue, isChecked) => {
    if (isChecked) {
      setSelectedCGPAOptions((prevOptions) => [...prevOptions, optionValue]);
    } else {
      setSelectedCGPAOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionValue)
      );
    }
  };

  const handleSkillsOptionChange = (optionValue, isChecked) => {
    if (isChecked) {
      setSelectedSkillsOptions((prevOptions) => [...prevOptions, optionValue]);
    } else {
      setSelectedSkillsOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionValue)
      );
    }
  };

  //To filter out the data based on the selected options
  useEffect(() => {
    let newFilteredData = CandidateTestData;

    if (selectedBranchOptions.length > 0) {
      newFilteredData = newFilteredData.filter((candidate) =>
        selectedBranchOptions.includes(candidate.branch)
      );
    }

    if (selectedCGPAOptions.length > 0) {
      const maxCGPA = Math.max(...selectedCGPAOptions.map(parseFloat));
      newFilteredData = newFilteredData.filter(
        (candidate) => parseFloat(candidate.CGPA) >= maxCGPA
      );
    }

    if (selectedSkillsOptions.length > 0) {
      newFilteredData = newFilteredData.filter(
        (candidate) =>
          candidate.skills &&
          selectedSkillsOptions.every((skill) =>
            candidate.skills.includes(skill)
          )
      );
    }

    if (searchTerm) {
      newFilteredData = newFilteredData.filter((candidate) =>
        candidate.usn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(newFilteredData);
  }, [
    selectedBranchOptions,
    selectedCGPAOptions,
    selectedSkillsOptions,
    searchTerm,
  ]);

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full bg-background-clr">
        <div className="flex flex-row h-4/5 w-4/5 ">
          <div className="flex basis-1/4 flex-col bg-primary-card ml-2 mr-2 rounded-md">
            <div className="h-10 w-full py-1 border-b-2 font-bold text-center text-lg border-divider-color">
              <p>Filters</p>
            </div>
            <div className="flex-grow overflow-auto scrollbar-hide">
              <Dropdown
                options={Branch}
                handleOptionChange={handleBranchOptionChange}
                selectedOptions={selectedBranchOptions}
                title="Branch"
              />
              <Dropdown
                options={CGPA}
                handleOptionChange={handleCGPAOptionChange}
                selectedOptions={selectedCGPAOptions}
                title="CGPA"
              />
              <Dropdown
                options={Skills}
                handleOptionChange={handleSkillsOptionChange}
                selectedOptions={selectedSkillsOptions}
                title="Skills"
              />
            </div>
          </div>
          <div className="border-l border-divider-color"></div>
          <div className="flex basis-3/4 flex-col bg-background-clr w-4/5 ml-2">
            <div className="flex items-center bg-search-bar h-12 mb-4 rounded-lg drop-shadow-[0px_0px_2px_rgba(0,0,0,1)]">
              <input
                className="bg-transparent outline-none flex-grow px-2"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <button type="submit" className="focus:outline-none pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-primary-card h-full rounded-lg overflow-auto">
              <div className="flex text-left rounded-2xl">
                <table className="w-full rounded-2xl">
                  <thead>
                    <tr>
                      <th className="bg-search-bar py-2 pl-4">USN</th>
                      <th className="bg-search-bar py-2 pl-4">Name</th>
                      <th className="bg-search-bar py-2 pl-4">Branch</th>
                    </tr>
                  </thead>
                  {filteredData.map((candidate, index) => (
                    <tr
                      className="border-b border-divider-color overflow-auto "
                      key={index}
                    >
                      <td className="py-2 pl-3">{candidate.usn}</td>
                      <td className="py-2 ">{candidate.name}</td>
                      <td className="py-2 ">{candidate.branch}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default candidates;
