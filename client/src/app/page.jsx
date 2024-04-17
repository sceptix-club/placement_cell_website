// page.jsx
"use client";
import React from "react";
import DriveCard from "@/components/driveCard";
// import Data from "../../public/data";
import supabase from "@/data/supabase";

const Home = () => {
  const [placements, setPlacements] = React.useState([]);

  React.useEffect(() => {
    const fetchPlacement = async () => {
      const { data, error } = await supabase.from("drive").select();
      if (!error) {
        setPlacements(data);
        console.log("data");
        console.log(data);
      }
    };
    fetchPlacement();
  }, []);

  return (
    <>
      <div className="lg:flex w-full justify-center items-center flex-col bg-background-clr overflow-y-auto sm: flex l">
        <section className="lg:w-2/3 sm: w-3/4">
          <h1 className="text-3xl font-bold text-white mb-6">Ongoing</h1>
          {placements.map((placement, index) => (
            <DriveCard key={placement.id} placement={placement} />
          ))}
        </section>
        <hr className="w-2/3 border-white my-6" />
        <section className="lg:w-2/3 sm: w-3/4">
          <h1 className="text-3xl font-bold text-white mb-6">Upcoming</h1>
          {/* {Data.map((placement, index) => (
            <DriveCard key={placement.id} placement={placement} />
          ))} */}
        </section>
        <div className="w-2/3 mb-6">
          <h1 className="text-3xl font-bold text-white mb-4"></h1>
        </div>
      </div>
    </>
  );
};

export default Home;
