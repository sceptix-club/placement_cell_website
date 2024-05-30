"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import RolesCard from "@/components/RolesCard";
import { usePathname } from "next/navigation";
import PlacementAPI from "@/app/api/PlacementAPI";
// import { useRoleContext } from "@/context/RoleContext";
import ManagerDriveButtons from "@/components/ManagerDriveButtons";
import { LoginContext } from "@/context";
import supabase from "@/data/supabase";

const driveinfo = () => {
  const router = useRouter();

  const [placements, setPlacements] = useState([]);
  const [role, setRole] = useState([]);
  const { userRole, setUserRole } = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);
  const [roleId, setRoleId] = useState(null); // Define roleId state
  const [loading, setLoading] = useState(true); // Define loading state
  const placementDate = placements.date;
  const date = new Date(placements.date);
  let driveDate = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // const dataAll = Data.find((item) => item.id === Number(pathNo));

  useEffect(() => {
    const checkUserRole = async () => {
      console.log("Checking user role");
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("user")
          .select()
          .eq("user_id", user.id);
        setUserRole(data[0].role);
      }
    };
    if (userRole == null) {
      console.log("null");
      checkUserRole();
    }
    if (userRole === 3) {
      setShow(true);
    }

    const timeDate = setTimeout(() => {
      setShowDate(true);
    }, 1500);
  }, [userRole]);

  const handleViewPDF = () => {
    if (placements.pdfFileURL) {
      window.open(placements.pdfFileURL, "_blank");
    }
  };
  // if (!dataAll) {
  //   return notFound();
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10 mb-10 h-auto bg-background-clr font-inter font-normal">
      <section className="flex flex-col p-5 sm:p-8 lg:p-16 w-11/12 sm:w-10/12 md:w-2/3 lg:w-3/5 border-white h-auto rounded-md bg-primary-card">
        <PlacementAPI
          pathNo={pathNo}
          setPlacements={setPlacements}
          setRole={setRole}
          setRoleIds={setRoleId}
        />
        <h2 className="text-lg lg:text-2xl text-role-text font-semibold">
          {placements.name}
        </h2>
        <h2 className="text-2xl lg:text-4xl mb-1 font-semibold">
          {placements.company}
        </h2>
        <div className="text-md lg:text-xl py-2 leading-tight lg:leading-tight font-medium">
          <p>Date: {showDate && driveDate}</p>
        </div>
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
        {/* <RegisterButton /> */}

        <hr className=" border-divider-color mt-5" />
        <div className="flex flex-row items-center justify-between mt-3">
          <button
            onClick={handleViewPDF}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-logo-bg"
          >
            View PDF
          </button>
        </div>
        <hr className=" border-divider-color mt-5" />

        {show && <ManagerDriveButtons props={placements.is_draft} />}

        {role.map((innerRole) => {
          return (
            <RolesCard
              key={innerRole.id}
              props={innerRole}
              prop2={placementDate}
            />
          );
        })}
      </section>
    </div>
  );
};

export default driveinfo;
