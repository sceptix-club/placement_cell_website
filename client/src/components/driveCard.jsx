// DriveCard.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const DriveCard = ({ placement }) => {
  const date = new Date(placement.date);
  let driveDate = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <>
      <div className="p-6 mb-2 flex  md:flex-row flex-col  bg-primary-card rounded-lg lg:w-full hover:scale-[103%] transition drop-shadow-md">
        <div className="w-full">
          <div className="flex justify-between">
            <Link href={`/drive/${placement.id}`} passHref>
              <div>
                <h3 className="text-2xl font-bold mb-2">{placement.name}</h3>
                <p className="text-xl font-bold mb-8">{placement.company}</p>
              </div>
            </Link>

            <div>
              <button className="bg-green-400 rounded-lg w-10 h-10 drop-shadow-lg">
                <Image
                  src="/external-link.png"
                  className="w-8 pl-2 invert"
                  alt="image"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <p className="text-lg text-white mb-8">{driveDate}</p>
          <div className="flex md:flex-row flex-col justify-between w-full">
            <div>
              {placement.role.map((role, index) => (
                <button
                  key={index}
                  className="bg-secondary-card text-white text-sm px-4 py-2  rounded mr-2 mb-2 drop-shadow-md cursor-default"
                >
                  {role.name}
                </button>
              ))}
            </div>
            <div>
              <button className="bg-green-400 px-2 py-1 rounded-md drop-shadow-lg">
                <Link href={`/drive/${placement.id}`} passHref>
                  More Details
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriveCard;
