// DriveCard.jsx
import React from "react";
import Link from "next/link";

const DriveCard = ({ placement }) => {
  return (
    <Link href={`/drive/${placement.id}`} passHref>
      <div className="m-4 p-6 mb-6 flex flex-row bg-primary-card rounded-lg w-full cursor-pointer">
        <div className="flex flex-col w-1/2">
          <h3 className="text-2xl font-bold mb-4">{placement.placementName}</h3>
          <p className="text-xl font-bold mb-4">{placement.companyName}</p>
        </div>
        <div className="flex flex-col items-end w-1/2">
          <div className="flex justify-end mb-4">
            <p className="text-xl text-white">{placement.date}</p>
          </div>
          <div className="flex space-x-4">
            {placement.roles.map((role, index) => (
              <button
                key={index}
                className="bg-secondary-card text-white text-sm px-4 py-2 rounded"
              >
                {role.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DriveCard;
