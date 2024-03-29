// page.jsx
import React from "react";
import DriveCard from "@/components/driveCard";
import Data from "../../public/data";

const Home = () => {
  return (
    <>
      <div className="lg:flex w-full justify-center items-center flex-col bg-background-clr overflow-y-auto sm: flex   justify-center items-center flex-col l">
        <section className="lg:w-2/3 sm: w-3/4">
          <h1 className="text-3xl font-bold text-white mb-6">Ongoing</h1>
          {Data.map((placement, index) => (
            <DriveCard key={placement.id} placement={placement} />
          ))}
        </section>
        <hr className="w-2/3 border-white my-6" />
        <section className="lg:w-2/3 sm: w-3/4">
          <h1 className="text-3xl font-bold text-white mb-6">Upcoming</h1>
          {Data.map((placement, index) => (
            <DriveCard key={placement.id} placement={placement} />
          ))}
        </section>
        <div className="w-2/3 mb-6">
          <h1 className="text-3xl font-bold text-white mb-4"></h1>
        </div>
      </div>
    </>
  );
};

export default Home;
