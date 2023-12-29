import React from "react";

const DriveCard = () => {
  return (
    <div className="m-4 flex flex-col bg-primary-card rounded-lg p-4 w-35 h-50 overflow-auto">
      <h3 className="text-lg font-bold mb-2">Placement Name</h3>
      <p>Company Name</p>
      <div className="flex flex-col items-end w-35 h-50 ">
        <p className="text-xs text-green-500 mb-1">10 mins ago</p>
        <p className="text-xs text-white mb-2">28/12/2023</p>
        <div className="flex space-x-4">
          <button className="bg-role-background text-role-text text-xs px-2 py-1 rounded">
            Data Analyst
          </button>
          <button className="bg-role-background text-role-text text-xs px-2 py-1 rounded">
            Roles
          </button>
          <button className="bg-role-background text-role-text text-xs px-2 py-1 rounded">
            Roles
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriveCard;
