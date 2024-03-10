"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import supabase from "@/data/supabase";
import { useContext } from "react";
import { LoginContext } from "@/context";

const UserName = "Vyasa";
//To check for loggedin/logged out for testing purposes
//var LoggedOut = true;
const ImageSource = "/testimg.png";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const PathName = usePathname();
  console.log(PathName);

  //To check if the user is logged in or not
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data);
      if (data.session !== null) {
        setIsLoggedIn(true);
        console.log("loggedin");
      } else {
        setIsLoggedIn(false);
        console.log("loggedout");
      }
    };
    checkSession();
  }, []);

  //For debugging purposes
  useEffect(() => {
    console.log("loggedin?", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header>
      <div className="flex justify-between lg:h-38 w-full items-center p-4 bg-background-clr text-role-text font-inter">
        <h1 className="lg:text-3xl text-2xl font-semibold text-main-heading pl-5">
          PLACEMENT_WEBSITE
        </h1>
        <div className="relative pr-3 ">
          <>
            <Image
              src="/testimg.png"
              alt="."
              width={100}
              height={24}
              priority
              className="w-12 h-12 rounded-full object-cover dark:invert cursor-pointer bg-logo-bg"
              onClick={() => setIsOpen(!isOpen)}
            />
            {PathName === "/login" ? (
              <>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 h-36  bg-primary-card rounded-md overflow-hidden shadow-xl z-10">
                    <a
                      href="/"
                      className="flex items-center justify-end pr-4 py-3 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white"
                    >
                      Home
                      <Image
                        src="/home.png"
                        alt="Logout"
                        width={20}
                        height={24}
                        className="ml-2 dark:invert"
                      />
                    </a>
                  </div>
                )}
              </>
            ) : isLoggedIn ? (
              <>
                {isOpen && (
                  <div className="absolute right-0 mt-2 lg:w-44 w-40 lg:h-auto  bg-primary-card rounded-md overflow-hidden shadow-xl z-10">
                    <h3 className="text-xl lg:text-2xl text-white  font-bold text-center py-4 ">
                      Hi {UserName}{" "}
                    </h3>
                    <a
                      href="/login"
                      className="flex items-center justify-end  px-4 py-3 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white"
                    >
                      Profile
                      <Image
                        src="/user.svg"
                        alt="profile"
                        width={20}
                        height={24}
                        className="ml-2 dark:inverted h-5"
                      />
                    </a>
                    {PathName !== "/" && (
                      <a
                        href="/"
                        className="flex items-center justify-end pr-4 py-3 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white"
                      >
                        Home
                        <Image
                          src="/home.png"
                          alt="Logout"
                          width={20}
                          height={24}
                          className="ml-2 dark:invert"
                        />
                      </a>
                    )}
                    <a
                      onClick={async () => {
                        const { error } = await supabase.auth.signOut();
                        if (!error) {
                          setIsLoggedIn(false);
                          router.push("/");
                        }
                      }}
                      className="flex items-center justify-end cursor-pointer px-4 py-4 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white"
                    >
                      Log out
                      <Image
                        src="/logout.png"
                        alt="Logout"
                        width={20}
                        height={24}
                        className="ml-2"
                      />
                    </a>
                  </div>
                )}
              </>
            ) : (
              <>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-44 h-30  bg-primary-card rounded-md overflow-hidden shadow-xl z-10">
                    <p className="text-3xl text-role-text  font-bold text-center py-2">
                      Hello
                    </p>
                    <a
                      href="/login"
                      className="flex items-center justify-end pr-4 py-3 lg:text-lg text-l text-role-text hover:bg-card-hover hover:text-white"
                    >
                      Log in
                      <Image
                        src="/logout.png"
                        alt="Logout"
                        width={20}
                        height={24}
                        className="ml-2"
                      />
                    </a>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;
