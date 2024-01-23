"use client";

import React, { useState } from "react";
//Data to be displayed in the table
import CandidateTestData from "../../../public/CandidateTestData.js";
import Dropdown from "../../components/DropdownFilter.jsx";

const candidates = () => {
  const [isFirstSelectOpened, setIsFirstSelectOpened] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCandidates = CandidateTestData.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full bg-background-clr">
        <div className="flex flex-row h-4/5 w-4/5 ">
          <div className="flex basis-1/4 flex-col bg-primary-card ml-2 mr-2 rounded-md">
            <div className="h-10 w-full py-1 border-b-2 font-bold text-center text-lg border-divider-color">
              <p>Filters</p>
            </div>
            <div className="flex-grow overflow-auto scrollbar-hide">
              <Dropdown />
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
            <div className="bg-primary-card h-full rounded-lg ">
              <div className="flex text-left rounded-2xl">
                <table className="w-full rounded-2xl">
                  <tr>
                    <th className="bg-search-bar py-2 pl-4">USN</th>
                    <th className="bg-search-bar py-2 pl-4">Name</th>
                    <th className="bg-search-bar py-2 pl-4">Branch</th>
                  </tr>
                  {filteredCandidates.map((candidate, index) => (
                    <tr className="border-b border-divider-color" key={index}>
                      <td className="py-2 pl-3">{candidate.usn}</td>
                      <td className="py-2 pl-3">{candidate.name}</td>
                      <td className="py-2 pl-3">{candidate.branch}</td>
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
