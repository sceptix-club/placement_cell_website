// "use client";
// import Role from "@/app/create/role/[id]/page";
// import React, { createContext, useState, useEffect, useContext } from "react";
// import supabase from "@/data/supabase";

// const RoleContext = createContext();

// export const RoleProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState(1);

//   let userID = 0;

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       if (data.session !== null) {
//         const { user } = data.session;
//         userID = user.id;
//         console.log("fetch_user3", userID);
//         fetchRole();
//       }
//     };

//     const fetchRole = async () => {
//       if (userID === 0) {
//         console.log("null");
//         return;
//       }
//       const { data, error } = await supabase
//         .from("user")
//         .select("role")
//         .eq("user_id", userID);
//       if (!error) {
//         const data1 = data[0].role;
//         setUserRole(data1);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <RoleContext.Provider value={{ userRole }}>{children}</RoleContext.Provider>
//   );
// };

// export const useRoleContext = () => useContext(RoleContext);
