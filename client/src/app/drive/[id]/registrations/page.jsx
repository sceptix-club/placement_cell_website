"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import supabase from "@/data/supabase";
import { useRouter } from "next/router";

const Registrations = () => {
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length).split("/")[0];

  const [drive, setDrive] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const { data, error } = await supabase
        .from("stat")
        .select("*,  role_id(*,drive_id(*)), student_id(*)")
        .eq("drive_id", pathNo);
      if (!error) {
        setRegistrations(data);
        console.log("datta", data.length);
        if (data.length != 0) {
          setDrive(data[0].role_id.drive_id.name);
        } else {
          setDrive("No Registrations Yet!");
        }
      } else {
        console.log("error", error);
      }
    };

    fetchRegistrations();
  }, []);
  return (
    <>
      <div className="p-8 m-5">
        <h1 className="text-3xl font-bold py-4">{drive}</h1>
        {/* <p className="text-xl py-4">Students Registered:</p> */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>USN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Role Registered</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => {
                return (
                  <tr key={index} className="hover">
                    <td>{index + 1}</td>
                    <td>{reg.student_id.usn}</td>
                    <td>{reg.student_id.name}</td>
                    <td>{reg.student_id.email}</td>
                    <td>{reg.student_id.branch}</td>
                    <td>{reg.student_id.year}</td>
                    <td>{reg.student_id.sem}</td>
                    <td>{reg.role_id.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Registrations;
