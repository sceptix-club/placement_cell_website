"use client";
import { useEffect, useState } from "react";
import RolesCard from "@/components/RolesCard";
// import Data from "../../../../public/data";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import PlacementAPI   from '@/app/api/PlacementAPI';


import supabase from "@/data/supabase";

const driveinfo = () => {
  const [placements, setPlacements] = useState([]);
  const [role, setRole] = useState([]);

  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);
  const [roleId, setRoleId] = useState(null); // Define roleId state

  // const dataAll = Data.find((item) => item.id === Number(pathNo));

  return (
    <div className="flex items-center justify-center py-10 mb-10 h-auto bg-background-clr font-inter font-normal">
      <section className="flex flex-col p-5 sm:p-8 lg:p-16  w-11/12 sm:w-10/12 md:w-2/3 lg:w-3/5 border-white h-auto rounded-md bg-primary-card">
      <PlacementAPI pathNo={pathNo} setPlacements={setPlacements} setRole={setRole} />
        <h2 className="text-lg lg:text-2xl text-role-text font-semibold">
          {placements.name}
        </h2>
        <h2 className="text-2xl lg:text-4xl mb-1 font-semibold">
          {placements.company}
        </h2>
        <div className="text-md lg:text-xl py-2 leading-tight lg:leading-tight font-medium">
          <p>{placements.description}</p>
        </div>
        <div className="flex flex-row item-center mt-4 lg:mt-5">
          <h3 className="text-sm lg:text-lg font-medium">Roles:&nbsp;</h3>
          
          {role.map((role) => {
            return (
              <p
                key={role.id}
                className="bg-secondary-card text-role-text-2 rounded-md px-2 ml-2 text-sm lg:text-lg font-medium"
              >
                {role.name}
              </p>
            );
          })}
        </div>
        {/* <Button/> */}
        <hr className=" border-divider-color mt-5" />

        {role.map((innerRole) => {
          return <RolesCard key={innerRole.id} props={innerRole} />;
        })}
      </section>
    </div>
  );
};

export default driveinfo;
