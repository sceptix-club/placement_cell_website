// DriveCard.jsx
import React from "react";
import Link from "next/link";

const DriveCard = ({ placement }) => {
  return (
    <Link href={`/drive/${placement.id}`} passHref>
      <div className="m-4 p-6 mb-6 flex flex-col md:flex-row bg-primary-card rounded-lg w-full cursor-pointer">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">{placement.name}</h3>
          <p className="text-xl font-bold mb-4">{placement.company}</p>
        </div>
        <div className="md:w-1/2 md:text-right">
          <div className="lg:md:flex justify-end mb-4">
            <p className="text-xl text-white ">{placement.date}</p>
          </div>
          <div className="lg:md:flex flex-wrap justify-end  ">
            {placement.role.map((role, index) => (
              <button
                key={index}
                className="bg-secondary-card text-white text-sm px-4 py-2 mb-2 rounded mr-2"
              >
                {role.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DriveCard;
