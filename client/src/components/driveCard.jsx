// DriveCard.jsx
import React from "react";
import Link from "next/link";

const DriveCard = ({ placement }) => {
  return (
    <Link href={`/drive/${placement.id}`} passHref>
      <div className="md:m-4 p-6 mb-6 flex flex-row bg-primary-card rounded-lg w-full cursor-pointer">
        <div className="md:flex flex-col w-1/2">
          <h3 className="md:text-2xl font-bold mb-4">
            {placement.placementName}
          </h3>
          <p className=" py-5 md:text-xl font-bold mb-4  items-start py-5">
            {placement.companyName}
          </p>
        </div>
        <div className=" md:flex flex-col items-end w-1/2 line-clamp-1">
          <div className=" flex ml-1 md:flex justify-end mb-4 mr-3 ">
            <p className="md:text-xl text-white">{placement.date}</p>
          </div>

          <div className=" space-x-2 space-y-3   py-5 text-balance align-text-center justify-center line-clamp-  ">
            {placement.roles.map((role, index) => (
              <button
                key={index}
                className="bg-secondary-card text-white px-2 py-2 mx-2  rounded line-clamp-2"
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
