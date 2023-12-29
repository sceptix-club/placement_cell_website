import React from "react";

const candidates = () => {
  return (
    <>
    <div className="flex justify-center items-center h-screen w-full bg-background-clr">
    <div className="flex flex-row h-4/5 w-4/5 border-2 border-white ">
        <div className="flex basis-1/4 bg-primary-card ml-2 mr-2 border-2 border-white rounded-md">
          <h1>Filters</h1>
        </div>
        <div className="border-l border-gray-400"></div>
        <div className="flex basis-3/4 flex-col bg-background-clr w-4/5 ml-2 rounded-md border-2 border-white">
          <div className="bg-search-bar h-12 mb-4 rounded-lg border-2 border-white">
            <h1> search bar</h1>
          </div>
          <div className="bg-primary-card h-full border-2 border-white">
             candidate list
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default candidates;
