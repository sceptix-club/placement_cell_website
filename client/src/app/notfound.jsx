import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background-clr text-primary-text relative">
      <div className="h-1/3 flex flex-col items-center justify-center">
        <div className="text-3xl text-white text-center font-bold mb-2 hover:text-white hover:shadow-md transition-all duration-300">
          WHOOPS
        </div>
        <div className="text-lg text-white mb-0">You've reached </div>
      </div>

      <div className="h-1/3 flex items-center justify-center relative">
        <div className="relative z-10 text-[36vh] text-logo-bg text-center font-bold transform hover:translate-y-[-15px] hover:translate-x-[-10px] transition-transform duration-900">
          404
        </div>
        <div className="absolute text-[36vh] text-white text-center font-bold">
          404
        </div>
      </div>

      <div className="h-1/3 flex flex-col items-center justify-center mt-0">
        <div className="text-[30px] text-white mb-2">Page  does  not  exist!</div>
        <div className="text-lg text-white mb-2">
          Return to&nbsp;
          <Link href="../" className="text-green-500 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;