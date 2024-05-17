"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LoginContext } from "@/context";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import supabase from "@/data/supabase";
import Headroom from "react-headroom";

const Header2 = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { userRole, setUserRole } = useContext(LoginContext);

  console.log("role", userRole);
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

  const PathName = usePathname();
  console.log(PathName);

  return (
    <Headroom>
      <div className="navbar bg-green-500 rounded-xl w-11/12 mx-auto my-5">
        <div className="navbar-start">
          <div className="dropdown">
            {isLoggedIn ? (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden hover:bg-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
            ) : null}

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-500 rounded-lg w-52 "
            >
              {isLoggedIn ? (
                <li>
                  <a className="hover:underline" href="/">
                    Home
                  </a>
                </li>
              ) : null}

              {isLoggedIn && userRole !== 3 ? (
                <li>
                  <a className="hover:underline" href="/profile">
                    Profile
                  </a>
                </li>
              ) : null}

              {userRole === 3 ? (
                <>
                  <li>
                    <a className="hover:underline" href="/">
                      Existing Drive
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="/create/drive">
                      New Drive
                    </a>
                  </li>
                  <li>
                    <a className="hover:underline" href="/candidates">
                      Candidates
                    </a>
                  </li>
                </>
              ) : null}

              {userRole === 2 ? (
                <li>
                  <a className="hover:underline" href="/mentees">
                    Mentees
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <a
            className="btn bg-green-500 text-white font-extrabold border-0 hover:bg-green-500 shadow-none text-2xl"
            href="/"
          >
            SJEC
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {isLoggedIn ? (
              <li>
                <Link className="hover:bg-green-500" href="/">
                  <button className="text-lg text-white border-b-2 border-transparent  hover:border-white transition-colors duration-200">
                    Home
                  </button>
                </Link>
              </li>
            ) : null}

            {isLoggedIn && userRole !== 3 ? (
              <li>
                <Link className="hover:bg-green-500" href="/profile">
                  <button className="text-lg text-white border-b-2 border-transparent hover:border-white transition-colors duration-200">
                    Profile
                  </button>
                </Link>
              </li>
            ) : null}

            {userRole === 3 ? (
              <>
                <li>
                  <Link className="hover:bg-green-500" href="/">
                    <button className="text-lg text-white border-b-2 border-transparent  hover:border-white transition-colors duration-200">
                      Existing Drives
                    </button>
                  </Link>
                </li>
                <li>
                  <Link className="hover:bg-green-500" href="/create/drive">
                    <button className="text-lg text-white border-b-2 border-transparent  hover:border-white transition-colors duration-200">
                      New Drive
                    </button>
                  </Link>
                </li>
                <li>
                  <Link className="hover:bg-green-500" href="/candidates">
                    <button className="text-lg text-white border-b-2 border-transparent  hover:border-white transition-colors duration-200">
                      Candidates
                    </button>
                  </Link>
                </li>
              </>
            ) : null}

            {userRole === 2 ? (
              <li>
                <Link className="hover:bg-green-500" href="/mentees">
                  <button className="text-lg text-white border-b-2 border-transparent  hover:border-white transition-colors duration-200">
                    Mentees
                  </button>
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="navbar-end">
          {PathName === "/login" ? null : isLoggedIn ? (
            <a
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                  setIsLoggedIn(false);
                  setUserRole(null);
                  router.push("/");
                }
              }}
              className="btn font-bold text-white hover:bg-green-500 hover:text-black "
            >
              Logout
            </a>
          ) : (
            <a
              className="btn font-bold text-white hover:bg-green-500 hover:text-black "
              href="/login"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </Headroom>
  );
};

export default Header2;
