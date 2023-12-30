import React from "react";

const DriveCard = () => {
  return (
    <div className="m-4 flex flex-row bg-primary-card rounded-lg p-4 w-78 h-50 overflow-auto">
      <div className="flex flex-col w-1/2">
        <h3 className="text-lg font-bold mb-2">Placement Name</h3>
        <p>Company Name</p>
      </div>
      <div className="flex flex-col items-end w-1/2 ">
        {/* <div className="flex justify-end">
          <p className="text-xs text-green-500 mb-1 p-1">10 mins ago</p>
        </div> */}
        <div className="flex justify-end mb-2 p-1">
          <p className="text-xs text-white">28/12/2023</p>
        </div>
        <div className="flex space-x-4 p-1">
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
