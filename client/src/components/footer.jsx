import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="p-5 w-full bg-primary-card text-white text-sm flex flex-col md:flex-row justify-between items-center">
      <Image
        src="/sjeclogo.avif"
        alt="Logo"
        className="logo"
        width={125}
        height={150}
      />

      <div className="flex-grow text-center">
        <a
          className="md:text-3xl text-sm mt-2 md:mt-0 "
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.sjec.ac.in/"
        >
          SJEC
        </a>
        <p>&copy; {new Date().getFullYear()} - All right reserved</p>
      </div>
      <div className="flex-grow-0 text-right">
        <p>
          Powered by{" "}
          <a
            href="https://sceptix-website.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            The sceptix club
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
