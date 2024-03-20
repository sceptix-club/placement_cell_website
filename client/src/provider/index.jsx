"use client";

import { useState ,useEffect} from "react";
import { LoginContext } from "@/context";

export default function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )
}