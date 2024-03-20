import React from "react";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center bg-background-clr absolute  bottom-0">
      <div className="flex justify-between items-center px-4 bg-primary-card font-inter lg:w-2/3 w-5/6 rounded-t-md">
        <p className=" text-role-text text-xs">
          &#169; 2024 All rights reserved.
        </p>
        <a
          href="https://www.sjec.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:text-2xl text-xl  text-role-text text-center hover:text-white"
        >
          SJEC
        </a>
        <p className="lg:pr-4 pl-2 text-role-text text-xs">
          Powered by{" "}
          <a
            href="https://sceptix-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-role-text hover:text-white"
          >
            Sceptix
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;