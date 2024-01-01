// DriveCard.jsx
import React from "react";
import Link from "next/link";
import placements from "@/data/placement";

const DriveCard = ({ id }) => {
  const placement = placements.find((p) => p.id === id);

  if (!placement) {
    return null;
  }

  return (
    <Link href={`/drive/${id}`} passHref>
      <div className="m-4 flex flex-row bg-primary-card rounded-lg p-4 w-78 h-50 overflow-auto cursor-pointer">
        <div className="flex flex-col w-1/2">
          <h3 className="text-lg font-bold mb-2">{placement.placementName}</h3>
          <p>{placement.companyName}</p>
        </div>
        <div className="flex flex-col items-end w-1/2">
          <div className="flex justify-end mb-2 p-1">
            <p className="text-xs text-white">{placement.date}</p>
          </div>
          <div className="flex space-x-4 p-1">
            {placement.roles.map((role, index) => (
              <button
                key={index}
                className="bg-secondary-card text-white text-xs px-2 py-1 rounded"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DriveCard;
