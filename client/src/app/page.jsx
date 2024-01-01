import React from "react";
import DriveCard from "@/components/driveCard";
import placements from "@/data/placement";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col bg-background-clr overflow-y-auto">
        <section className="w-5/6">
          <h1 className="text-3xl font-bold text-white mb-4">Ongoing</h1>
          {placements.map((placement) => (
            <DriveCard key={placement.id} id={placement.id} />
          ))}
        </section>
        <hr className="w-5/6 border-white my-4" />
        <section className="w-5/6">
          <h1 className="text-3xl font-bold text-white mb-4">Upcoming</h1>
          {placements.map((placement) => (
            <DriveCard key={placement.id} id={placement.id} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
