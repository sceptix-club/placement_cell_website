"use client";

import React, { useState } from 'react'; 
import Image from "next/image";
import { usePathname } from 'next/navigation'


const UserName = "Vyasa";
//To check for loggedin/logged out for testing purposes 
const LoggedOut = false;
const ImageSource = "/testimg.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const PathName = usePathname();
  console.log(PathName);
  

  return (
  <header>
    <div className="flex justify-between lg:h-38 w-full items-center p-4 bg-background-clr text-role-text font-inter">
      <h1 className=" lg:text-3xl text-2xl font-bold text-main-heading pl-5">PLACEMENT_WEBSITE</h1>
      <div className="relative pr-3 ">
          <>
          { PathName === '/login'?
            (null)
            :
            (( PathName === '/' && LoggedOut )?(
              <>
              <Image
                src="/testimg.png"
                alt="."
                width={100}
                height={24}
                priority className="w-12 h-12 rounded-full object-cover dark:invert cursor-pointer bg-logo-bg" onClick={() => setIsOpen(!isOpen)}
              /> 
              {isOpen && (
              <div className="absolute right-0 mt-2 w-44 h-30  bg-primary-card rounded-md overflow-hidden shadow-xl z-10">
                <p className='text-3xl text-role-text  font-bold text-center py-2'>Hello</p>
                <a href="#" className="flex items-center justify-end pr-4 py-3 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white">
                  Log in
                  <Image src="/logout.png" alt="Logout" width={20} height={24} className="ml-2" />
                </a>
              </div>
              )}
              </>
            )
            :
            (
              <>
              <Image
                src="/testimg.png"
                alt="."
                width={100}
                height={24}
                priority className="w-12 h-12 rounded-full object-cover dark:invert cursor-pointer bg-logo-bg" onClick={() => setIsOpen(!isOpen)}
              /> 
              {isOpen && (
              <div className="absolute right-0 mt-2 lg:w-44 w-40 lg:h-44  bg-primary-card rounded-md overflow-hidden shadow-xl z-10">
                <h3 className='text-xl lg:text-2xl text-white  font-bold text-center py-4 '>Hi {UserName} </h3>
                <a href="#" className="flex items-center justify-end  px-4 py-3 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white">
                  Profile
                  <Image src="/user.svg" alt="profile" width={20} height={24} className="ml-2 dark:inverted h-5" />
                </a>
                <a href="#" className="flex items-center justify-end  px-4 py-4 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white">
                  Log out
                  <Image src="/logout.png" alt="Logout" width={20} height={24} className="ml-2" />
                </a>
              </div>
              )}
              </>
            )
            )
          }
          </>
      </div>
    </div>
  </header>
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