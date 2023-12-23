"use client";
import React, { useState } from 'react';
import Image from '/public/testimg.png'; 

const UserName="Vyasa";
const LoggedIn=true;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <div className="flex justify-between lg:h-38 w-full items-center p-4 bg-transparent-500 text-white ">
      <h1 className="pl-2 font-serif text-2xl font-bold text-white">PLACEMENT_WEBSITE</h1>
      <div className="relative pr-3">
        <img 
          src={Image} alt="." className="h-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}
        />
         {isOpen && ( 
          <>
            {LoggedIn ? (
        <>
          <div className="absolute right-0 mt-2 w-48 h-44  bg-white rounded-md overflow-hidden shadow-xl z-10">
          <h3 className='text-2xl text-black  font-bold text-center py-4 '>Hi {UserName} </h3>
          <a href="#" className=" block px-4 py-3 text-lg text-gray-700 hover:bg-blue-500 hover:text-white">Profile</a>
          <a href="#" className=" block px-4 py-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white">Log out</a>
          </div>
        </>
      ) : (
        <>
          <div className="absolute right-0 mt-2 w-48 h-30  bg-white rounded-md overflow-hidden shadow-xl z-10">
          <h3 className='text-3xl text-black  font-bold text-center py-4'>Hello</h3>
          <a href="#" className=" text-center block px-4 py-2 text-xl text-gray-700 hover:bg-blue-500 hover:text-white">Log in</a>
          </div>
        </>
      )}
          </>
        )} 
      </div>
    </div>
  );
};

// function DropdownItem(props){
//   return(
//     <li className = 'dropdownItem'>
//       <img src={props.img}></img>
//       <a> {props.text} </a>
//     </li>
//   );
// }

export default Header;