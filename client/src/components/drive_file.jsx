import React from "react";

const DriveFile = () => {
  return (
    <div className="m-4 flex flex-col border border-gray-300 bg-gray-700 rounded-lg p-4 h-48 hover:bg-#6E6E6E bg-#393939">
      <h3 className="text-lg font-bold">hp Card 1</h3>
      <p>Content for hp Card 1</p>
      <div className="mt-auto flex flex-col items-end">
        <p className="text-xs text-green-500">4 mins ago</p>
        <p className="text-xs text-white">28/12/2023</p>
        <div className="flex space-x-2 mt-2">
          <button className="bg-gray-700 text-white px-2 py-1 rounded">
            Data Analyst
          </button>
          <button className="bg-gray-700 text-white px-2 py-1 rounded">
            Roles
          </button>
          <button className="bg-gray-700 text-white px-2 py-1 rounded">
            Roles
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriveFile;
