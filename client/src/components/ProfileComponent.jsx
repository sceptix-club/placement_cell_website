import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import supabase from "@/data/supabase";

const ProfileComponent = ({ routePrefix, isVerify, onUidChange, props }) => {
  const router = useRouter();
  const pathName = usePathname();
  const pathNo = pathName.slice(`/${routePrefix}/`.length);
  const pathWithoutPrefix = pathName.slice(1);
  // Initialize state for profile data, edit mode, new skill, and adding skill flag
  const [verified, setVerified] = useState(true);



  const [dataAll, setDataAll] = useState({
    id: "",
    name: "",
    usn: "",
    branch: "",
    year: "",
    email: "",
    cgpa: "",
    phone: "",
    activeBacklogs: "",
    skills: ["", ""],
  });

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (data.session == null) {
          router.push("/login");
          return;
        }
        const { user } = data.session;

        // Fetch the user_id from the user table
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("id")
          .eq("user_id", user.id);
        if (userError) {
          throw userError;
        }
        const uid = userData[0].id;
        console.log("is", uid);

        // Fetch data from the student table using user_id
        const { data: studentData, error: studentError } = await supabase
          .from("student")
          .select()
          .eq("user_id", uid);
        if (studentError) {
          throw studentError;
        }
        const sid = studentData[0].id;
        console.log("Student data:", studentData[0]);
        setDataAll(studentData[0]);
        setVerified(true); // Assuming user is verified if data is successfully fetched
        onUidChange(sid);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error state or show appropriate message to the user
      }
    };
    checkUserStatus();
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [aadhaarLink, setAadhaarLink] = useState("");


  // Handle click on Edit button
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Handle click on Save button
  const handleSaveClick = async () => {
    try {
      // Make an API call to update the data in the Supabase database
      const { data, error } = await supabase
        .from("student")
        .update({
          ...dataAll,
          resume_link: resumeLink,
          aadhaar_link: aadhaarLink,
        })
        .eq("id", dataAll.id);

      if (error) {
        throw error;
      }

      console.log("Data updated successfully:", data);
      setEditMode(false);
      setAddingSkill(false);
    } catch (error) {
      console.error("Error updating data:", error.message);
      // Handle error state or show appropriate message to the user
    }
  };

  const handleCancelClick = () => {
    // Reset data and cancel changes
    // setDataAll(profileData.find((item) => item.id === Number(pathNo)));
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

  const handleVerifyClick = async () => {
    try {
      const { data, error } = await supabase
        .from("academics")
        .update({ verified: 1 })
        .eq("student_id", data.id);

      if (error) {
        throw error;
      }

      console.log("Verification Successful!");

    } catch (error) {
      console.error("Error verifying:", error.message);

    }
    // Display an alert when the "Verify" button is clicked
    window.alert("Verification Successful!");
    // You can perform additional actions after verification is complete
  };

  // put 404 page here
  {
    verified ? console.log("Logged in") : console.log("404 page not found");
  }

  return (
    <div className="bg-background-clr text-primary-text ">
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-16 mx-4">
        <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
          <h2 className="text-2xl mb-4">Personal Details</h2>
          <div className="bg-primary-card p-8 rounded-lg md:h-[460px]">
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="bg-role-background p-0 rounded-lg mb-4 w-1/2 mt-0 m-0 h-[150px] overflow-hidden my-0"></div>
              <h2 className="text-2xl mb-0 mt-0 font-bold text-center text-main-text">
                {dataAll?.name}
              </h2>
            </div>
            <div className="text-left mt-0 text-main-text">
              <p className="mb-[10px]">USN: {dataAll?.studentData}</p>
              <p className="mb-[10px]">BRANCH: {dataAll?.branch}</p>
              <p className="mb-[10px]">YEAR: {dataAll?.year}</p>
              <p className="mb-[10px]">Email: {dataAll?.email}</p>
              <p className="mb-[10px]">Phone Number: {dataAll?.phone}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 ml-4">
          <h2 className="text-2xl mb-4">Academics</h2>
          <div className="bg-primary-card p-8 rounded-lg md:h-[460px]">
            <div className="flex mb-4 items-center">
              <div className="w-2/3">
                <label className="block text-white">CGPA:</label>
              </div>
              <div className="flex w-2/3">
                {editMode ? (
                  <input
                    type="text"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center ml-auto h-8"
                    defaultValue={dataAll?.cgpa}
                  />
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center ml-auto h-8">
                    {dataAll?.cgpa}
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
                    defaultValue={dataAll?.activeBacklogs}
                  />
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8">
                    {dataAll?.activeBacklogs}
                  </div>
                )}
              </div>
            </div>
            <hr className="my-4" />
            <label className="block text-white mb-4">Skills:</label>
            <div className="flex flex-wrap -mx-2">
              {dataAll?.skills?.map((skill, index) => (
                <div
                  key={index}
                  className={`w-1/3 px-2 mb-4 text ${editMode && index === dataAll.skills.length - 1
                    ? "w-1/4"
                    : ""
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
                <label className="block text-white ml-8 w-full max-w-[360px] mx-auto">
                  Resume:
                </label>
              </div>
              <div className="w-2/3">
                {editMode ? (
                  <input
                    type="text"
                    placeholder="Paste the link to your resume here"
                    className="text-white bg-secondary-card rounded-md w-full p-2 h-8"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                  />
                ) : (
                  <input
                    placeholder="Enter the link to your Resume"
                    type="text"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8 placeholder:text-white"
                    readOnly
                    value={resumeLink}
                  />
                )}
              </div>
            </div>

            {/* Aadhaar upload */}
            <div className="flex mb-4 items-center">
              <div className="w-1/3">
                <label className="block text-white ml-8 w-full max-w-[360px] mx-auto">
                  Aadhaar:
                </label>
              </div>
              <div className="w-2/3">
                {editMode ? (
                  <input
                    type="text"
                    placeholder="Paste the link to your Aadhaar here"
                    className="text-white bg-secondary-card rounded-md w-full p-2 h-8"
                    value={aadhaarLink}
                    onChange={(e) => setAadhaarLink(e.target.value)}
                  />
                ) : (
                  <input
                    placeholder="Enter the link to your Aadhaar"
                    type="text"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8 placeholder:text-white"
                    readOnly
                    value={aadhaarLink}
                  />
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
              {editMode && (
                <button
                  className="bg-logo-bg text-black font-bold px-4 py-2 rounded-md mb-2 md:mr-4 md:mb-0"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              )}
              {isVerify ? (
                <button
                  className="bg-logo-bg text-black font-bold px-10 py-0 rounded-md"
                  onClick={handleVerifyClick}
                >
                  {isVerify ? "Verify" : "Edit"}
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
