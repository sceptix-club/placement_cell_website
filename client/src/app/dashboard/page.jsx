import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 m-4">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome, Manager</h1>
        <div className="flex flex-row p-3 m-3 justify-around">
          <Link href="/">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
              Existing Drives
            </button>
          </Link>
          <Link href="/create/drive">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
              Create New Drive
            </button>
          </Link>
          <Link href="/candidates">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
              Candidates
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
