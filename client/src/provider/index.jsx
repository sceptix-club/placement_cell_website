"use client";

import { useState } from "react";
import { LoginContext } from "@/context";

export default function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}
    >
      {children}
    </LoginContext.Provider>
  );
}
