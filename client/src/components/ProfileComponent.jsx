import React, { useState } from "react";
import { usePathname } from "next/navigation";
import profileData from "../../public/profile_data";
import NotFound from "../app/profile/[id]/notfound"; // Import the NotFound component

const ProfileComponent = ({ routePrefix, isMenteeVerify }) => {
  const pathName = usePathname();
  const pathNo = pathName.slice(`/${routePrefix}/`.length);
  const pathWithoutPrefix = pathName.slice(1);

  // Initialize state for profile data, edit mode, new skill, and adding skill flag
  const [dataAll, setDataAll] = useState(
    profileData.find((item) => item.id === Number(pathNo))
  );

  // Check if dataAll is undefined (profile not found)
  if (!dataAll) {
    // Redirect to NotFound component or display a message
    return <NotFound />;
  }


 
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);

  // Handle click on Edit button
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Handle click on Save button
  const handleSaveClick = () => {
    setEditMode(false);
    setAddingSkill(false); // Clear addingSkill state when saving changes
    // Update the state or make API calls to save changes
  };

  const handleCancelClick = () => {
    // Reset data and cancel changes
    setDataAll(profileData.find((item) => item.id === Number(pathNo)));
    setEditMode(false);
    setNewSkill("");
    setAddingSkill(false);
  };

  // Handle click on Add Skill button
  const handleAddSkill = () => {
    setAddingSkill(true);
  };

  // Handle removing a skill by index
  const handleRemoveSkill = (indexToRemove) => {
    setDataAll((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, index) => index !== indexToRemove),
    }));
    setAddingSkill(false); // Clear addingSkill state when removing a skill
  };

  // Handle saving a new skill
  const handleSaveNewSkill = () => {
    if (newSkill.trim() !== "") {
      setDataAll((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill],
      }));
      setNewSkill("");
      setAddingSkill(false);
    }
  };


    // Handle file upload for Resume
    const handleResumeUpload = (event) => {
        const file = event.target.files[0];
        // You can perform additional checks or operations with the file
        setDataAll((prevData) => ({
          ...prevData,
          resumeUpload: file.name, // Assuming you want to display the file name
        }));
      };
    
      // Handle file upload for Aadhaar
      const handleAadhaarUpload = (event) => {
        const file = event.target.files[0];
        // You can perform additional checks or operations with the file
        setDataAll((prevData) => ({
          ...prevData,
          aadhaarUpload: file.name, // Assuming you want to display the file name
        }));
      };

      const handleVerifyClick = () => {
        // Display an alert when the "Verify" button is clicked
        window.alert("Verification Successful!");
        // You can perform additional actions after verification is complete
      };

  return (
    <div className="bg-background-clr text-primary-text ">
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-16 mx-4">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-2xl mb-4">Personal Details</h2>
          <div className="bg-primary-card p-8 rounded-lg md:h-[460px]"><div className="p-8 flex flex-col items-center justify-center">
              <div className="bg-role-background p-0 rounded-lg mb-4 w-1/2 mt-0 m-0 h-[150px] overflow-hidden my-0"></div>
              <h2 className="text-2xl font-bold text-center text-main-text">
                {dataAll && dataAll.name}
              </h2>
            </div>
            <div className="text-left text-main-text">
              <p className="mb-4">USN: {dataAll && dataAll.usn}</p>
              <p className="mb-4">BRANCH: {dataAll && dataAll.branch}</p>
              <p className="mb-4">YEAR: {dataAll && dataAll.year}</p>
              <p>Email: {dataAll && dataAll.email}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 ml-4">
          <h2 className="text-2xl mb-4">Academics</h2>
          <div className="bg-primary-card p-8 rounded-lg md:h-[460px]"><div className="flex mb-4 items-center">
              <div className="w-2/3">
                <label className="block text-white">CGPA:</label>
              </div>
              <div className="flex w-2/3">
                {editMode ? (
                  <input
                    type="text"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center ml-auto h-8"
                    defaultValue={dataAll && dataAll.cgpa}
                  />
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center ml-auto h-8">
                    {dataAll && dataAll.cgpa}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mb-4 items-center">
              <div className="w-2/3">
                <label className="block text-white">Active Backlogs:</label>
              </div>
              <div className="w-2/3">
                {editMode ? (
                  <input
                    type="text"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                    defaultValue={dataAll && dataAll.activeBacklogs}
                  />
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8">
                    {dataAll && dataAll.activeBacklogs}
                  </div>
                )}
              </div>
            </div>
            <hr className="my-4" />
          <label className="block text-white mb-4">Skills:</label>
          <div className="flex flex-wrap -mx-2">
            {dataAll && dataAll.skills.map((skill, index) => (
              <div
                key={index}
                className={`w-1/3 px-2 mb-4 text ${
                  editMode && index === dataAll.skills.length - 1 ? "w-1/4" : ""
                }`}
              >
                {editMode ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                      defaultValue={skill}
                      onChange={(e) =>
                        setDataAll((prevData) => ({
                          ...prevData,
                          skills: prevData.skills.map((s, i) =>
                            i === index ? e.target.value : s
                          ),
                        }))
                      }
                    />
                    {index === dataAll.skills.length - 1 && !addingSkill && (
                      <span
                        className="text-white ml-2 cursor-pointer"
                        onClick={handleAddSkill}
                      >
                        +
                      </span>
                    )}
                    {!editMode && (
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <strong>X</strong>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8">
                    {skill}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Skill button */}
          {editMode && addingSkill && (
            <div className="mb-4 flex justify-center items-center">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="New Skill"
                className="text-white bg-secondary-card rounded-md w-1/4 p-2 text-center h-8"
              />
              <button
                className="bg-logo-bg text-black font-bold px-4 py-0 ml-2 rounded-md"
                onClick={handleSaveNewSkill}
              >
                +
              </button>
            </div>
          )}

     

              <hr className="my-4" />
               {/* Resume upload */}
               <div className="flex mb-4 items-center">
            <div className="w-1/3">
            <label className="block text-white ml-8 w-full max-w-[360px] mx-auto ml-0">Resume:</label>
            </div>
            <div className="w-2/3">
              {editMode ? (
                <div className="flex items-center">
                  <input
                    type="file"
                    onChange={handleResumeUpload}
                    accept=".pdf,.doc,.docx" // Set accepted file types
                    className="hidden" // Hide the original input
                    id="resumeInput" // Add an ID for the label association
                  />
                  <label
                    htmlFor="resumeInput"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                  defaultValue={dataAll && dataAll.resumeUpload}
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Aadhaar upload */}
          <div className="flex mb-4 items-center">
            <div className="w-1/3">
            <label className="block text-white ml-8 w-full max-w-[360px] mx-auto ml-0">Aadhaar:</label>
            </div>
            <div className="w-2/3">
              {editMode ? (
                <div className="flex items-center">
                  <input
                    type="file"
                    onChange={handleAadhaarUpload}
                    accept=".pdf,.jpg,.jpeg,.png" // Set accepted file types
                    className="hidden" // Hide the original input
                    id="aadhaarInput" // Add an ID for the label association
                  />
                  <label
                    htmlFor="aadhaarInput"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                  defaultValue={dataAll && dataAll.aadhaarUpload}
                  readOnly
                />
              )}
            </div>
          </div>


          <div className="mb-4 flex flex-col md:flex-row justify-center items-center">{editMode && (
       <button
       className="bg-logo-bg text-black font-bold px-4 py-2 rounded-md mb-2 md:mr-4 md:mb-0"
       onClick={handleCancelClick}
     >
       Cancel
     </button>
  )}
  {isMenteeVerify ? (
    <button
      className="bg-logo-bg text-black font-bold px-10 py-0 rounded-md"
      onClick={handleVerifyClick}
    >
      {isMenteeVerify ? "Verify" : "Edit"}
    </button>
  ) : (
    <button
    className="bg-logo-bg text-black font-bold px-4 py-2 rounded-md ml-2"
    onClick={editMode ? handleSaveClick : handleEditClick}
  >
    {editMode ? "Save" : "Edit"}
  </button>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;