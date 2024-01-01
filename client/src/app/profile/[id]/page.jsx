"use client"

import React from "react";

import profileData from "../../../../public/profile_data";
import { usePathname } from "next/navigation"; // Import from next/navigation



const ProfilePage = () => {
  const pathName = usePathname(); // Use usePathname from next/navigation
  const pathNo = pathName.slice("/profile/".length);
  console.log(pathNo);
  const dataAll = profileData.find((item) => item.id === Number(pathNo));

  if (!dataAll) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="bg-background-clr text-primary-text min-h-screen">
    

      <div className="flex justify-center items-center mt-10 mx-4">
        <div className="w-1/3 mr-4">
          <h2 className="text-2xl mb-4">Personal Details</h2>
          <div className="bg-primary-card p-8 rounded-lg h-[460px]">
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="bg-role-background p-0 rounded-lg mb-4 w-1/2 mt-0 m-0 h-[150px] overflow-hidden my-0">
             
              </div>
              <h2 className="text-2xl font-bold text-center text-main-text">
              {dataAll.name}
              </h2>
            </div>
            <div className="text-left text-main-text">
              <p className="mb-4">USN: {dataAll.usn}</p>
              <p className="mb-4">BRANCH: {dataAll.branch}</p>
              <p className="mb-4">YEAR: {dataAll.year}</p>
              <p>Email: {dataAll.email}</p>
            </div>
          </div>
        </div>

        <div className="w-1/3 ml-4">
          <h2 className="text-2xl mb-4">Academics</h2>
          <div className="bg-primary-card p-8 rounded-lg h-[460px]">
            <div className="flex mb-4 items-center">
              <div className="w-2/3">
                <label className="block text-white">CGPA:</label>
              </div>
              <div className="flex w-2/3">
  <input
    type="text"
    className="text-white bg-secondary-card rounded-md w-full p-2 text-center ml-auto h-8"
    defaultValue={dataAll.cgpa}
    readOnly
  />
</div>

             
            </div>
            <div className="flex mb-4 items-center">
              <div className="w-2/3">
                <label className="block text-white">Active Backlogs:</label>
              </div>
              <div className="w-2/3">
              <input
  type="text"
  className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
  defaultValue={dataAll.activeBacklogs}
  readOnly
/>

              </div>
            </div>
            <hr className="my-4" />
           <label className="block text-white mb-4">Skills:</label>
<div className="flex flex-wrap -mx-2">
  {dataAll.skills.map((skill, index) => (
    <div key={index} className="w-1/3 px-2 mb-4 text">
      <input
        type="text"
        className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
        defaultValue={skill}
        readOnly
      />
    </div>
  ))}
  </div>



            <hr className="my-4" />
            <label className="block text-white mb-4">Documents:</label>
            <div className="flex mb-4 items-center">
              <div className="w-1/3">
                <label className="block text-white ml-8">Resume:</label>
              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                  defaultValue={dataAll.resumeUpload}
                  readOnly
                />
              </div>
            </div>

            <div className="flex mb-4 items-center">
              <div className="w-1/3">
                <label className="block text-white ml-8">Aadhaar:</label>
              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                  defaultValue={dataAll.aadhaarUpload}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4 flex justify-center items-center">
              <button className="bg-logo-bg text-black font-bold px-10 py-0 rounded-md">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
