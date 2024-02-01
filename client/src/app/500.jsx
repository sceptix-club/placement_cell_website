"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NotFound = () => {
  const [isUp, setIsUp] = useState(true);
  const animationRef = useRef();

  useEffect(() => {
    // Function to toggle the animation direction
    const toggleAnimation = () => {
      setIsUp((prevIsUp) => !prevIsUp);
    };

    const timer = setInterval(toggleAnimation, 2000);


    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Programmatically update the style of the animated elements
    if (animationRef.current) {
      animationRef.current.style.transform = isUp ? "translateY(-15px)" : "translateY(0px)";
    }
  }, [isUp]);

  return (
    <div className="flex flex-col items-center justify-center bg-background-clr text-primary-text relative">
      <div className="h-1/3 flex flex-col items-center justify-center">
        <div className="text-3xl text-white text-center font-bold mb-2  ">
          WHOOPS
        </div>
        <div className="text-lg text-white mb-0"> </div>
      </div>

      <div className="h-1/3 flex items-center justify-center relative">
        <div
          ref={animationRef}
          className="relative z-10 text-[36vh] text-logo-bg text-center font-bold transform transition-transform duration-500"
        >
          500
        </div>
        <div
          className="absolute text-[36vh] text-white text-center font-bold"
          
        >
          500
        </div>
      </div>

      <div className="h-1/3 flex flex-col items-center justify-center mt-0">
        <div className="text-[30px] text-white mb-2">Internal server error</div>
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
