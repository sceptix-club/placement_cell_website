import React from "react";

const Footer = () => {
  return (
    <footer>
      <hr className="border-t-2 border-gray-300" />
      <div className="flex items-center justify-center w-full lg:h-8 px-auto bg-transparent font-inter">
        <a href="https://www.sjec.ac.in/" target="_blank" rel="noopener noreferrer" className="lg:text-2xl text-xl font-bold text-white text-center w-full hover:underline">ST JOSEPH ENGINEERING COLLEGE</a>
      </div>
      <div className="flex justify-between px-4 py-2 bg-transparent font-inter">
        <p className="lg:pl-4 pl-2 text-white text-xs">&#169; 2023 All rights reserved.</p>
        <p className="lg:pr-4 pl-2 text-white text-xs">Powered by Sceptix</p>
      </div>
    </footer>
  );
};

export default Footer;
