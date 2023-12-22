import React from "react";
import Header from "../../../components/Header"; // Adjust the path based on your folder structure
import Image from "next/image";

const profile = () => {
  return (
    <div className="bg-black text-primary-text min-h-screen">
      <Header />

      <div className="flex justify-center items-center mt-10 mx-4">
        <div className="w-1/3 mr-4">
          <h2 className="text-2xl mb-4">Personal Details</h2>
          <div className="bg-background-clr p-8 rounded-lg h-[460px]">
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="bg-role-background p-0 rounded-lg mb-4 w-1/2 mt-0 m-0 h-[150px] overflow-hidden my-0">
                <Image
                  src="/your-photo.jpg"
                  alt="Your Photo"
                  width={150}
                  height={150}
                />
              </div>
              <h2 className="text-2xl font-bold text-center text-main-text">Name</h2>
            </div>
            <div className="text-left text-main-text">
              <p className="mb-4">USN:</p>
              <p className="mb-4">BRANCH:</p>
              <p className="mb-4">YEAR:</p>
              <p>xyz@sjec.ac.in</p>
            </div>
          </div>
        </div>

        <div className="w-1/3 ml-4">
          <h2 className="text-2xl mb-4">Academics</h2>
          <div className="bg-background-clr p-8 rounded-lg h-[460px]">
            <div className="flex mb-4 items-center">
              <div className="w-1/3">
                <label className="block text-white">CGPA:</label>
              </div>
              <div className="w-2/3">
                <input type="text" className="text-white bg-primary-card rounded-md w-full p-2" />
              </div>
            </div>
            <div className="flex mb-4 items-center">
              <div className="w-1/3">
                <label className="block text-white">Active Backlogs:</label>
              </div>
              <div className="w-2/3">
                <input type="text" className="text-white bg-primary-card rounded-md w-full p-2" />
              </div>
            </div>
            <hr className="my-4" />
            <p className="mb-2">Skills:</p>
            <div className="flex mb-8">
              <input type="text" className="text-white bg-primary-card rounded-md w-1/3 p-2 mx-1" />
              <input type="text" className="text-white bg-primary-card rounded-md w-1/3 p-2 mx-1" />
              <input type="text" className="text-white bg-primary-card rounded-md w-1/3 p-2 mx-1" />
            </div>
            <hr className="my-4" />
            <label className="block text-white mb-4">Documents:</label>
<div className="mb-4 ml-4 flex justify-center items-center">
  <label className="block text-white">Aadhar:</label>
  <input type="file" className="text-white ml-2" style={{ display: 'none' }} />
</div>

<div className="mb-4 ml-4 flex justify-center items-center">
  <label className="block text-white">Resume:</label>
  <input type="file" className="text-white ml-2" style={{ display: 'none' }} />
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

export default profile;
