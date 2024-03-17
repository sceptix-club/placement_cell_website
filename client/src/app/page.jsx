// page.jsx
"use client";
import React from "react";
import DriveCard from "@/components/driveCard";
import Data from "../../public/data";
import { useContext } from "react";
import { LoginContext } from "@/context";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
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

      {isLoggedIn ? (
        <a
          href="/Role"
          title="Create Role"
          class="fixed z-90 bottom-10 right-8 bg-zinc-700 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-zinc-800 hover:drop-shadow-2xl  duration-300 m-auto"
        >
          +
        </a>
      ) : null}
    </>
  );
};

export default Home;
