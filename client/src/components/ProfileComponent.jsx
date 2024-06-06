import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import supabase from "@/data/supabase";

const ProfileComponent = ({ routePrefix, isVerify, onUidChange, student }) => {
  const router = useRouter();
  const pathName = usePathname();
  const pathNo = pathName.slice(`/${routePrefix}/`.length);
  const pathWithoutPrefix = pathName.slice(1);
  const [verified, setVerified] = useState(true);

  const [dataAll, setDataAll] = useState({
    id: "server Error",
    name: " Error",
    usn: "server Error",
    branch: "server Error",
    year: "server Error",
    email: "server Error",
    phone: "Server Error",
    skills: ["", ""],
  });

  const [academics, setAcademics] = useState({
    cgpa: "",
    backlogs: "",
    verified: 0, // Added verification status
  });

  const [academicsExists, setAcademicsExists] = useState(false);

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const { data: studentData, error: studentError } = await supabase
          .from("student")
          .select()
          .eq("user_id", uid);
        if (studentError) {
          throw studentError;
        }
        const sid = studentData[0].id;
        setDataAll(studentData[0]);
        setVerified(true);
        if (onUidChange) onUidChange(sid);

        // Fetch academics data
        const { data: academicsData, error: academicsError } = await supabase
          .from("academics")
          .select()
          .eq("student_id", sid);
        if (academicsError) {
          throw academicsError;
        }
        if (academicsData.length > 0) {
          setAcademics(academicsData[0]);
          setAcademicsExists(true); // Indicates that the academic data exists
        }
      } catch (error) {
        console.error("Error fetching student data:", error.message);
      }
    };

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

        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("id")
          .eq("user_id", user.id);
        if (userError) {
          throw userError;
        }
        const uid = userData[0].id;

        fetchUserData(uid);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (!student) {
      checkUserStatus();
    } else {
      setDataAll(student);
      setVerified(true);

      // Fetch academics data
      const fetchAcademicsData = async () => {
        try {
          const { data: academicsData, error: academicsError } = await supabase
            .from("academics")
            .select()
            .eq("student_id", student.id);
          if (academicsError) {
            throw academicsError;
          }
          if (academicsData.length > 0) {
            setAcademics(academicsData[0]);
            setAcademicsExists(true); // Indicates that the academic data exists
          }
        } catch (error) {
          console.error("Error fetching academics data:", error.message);
        }
      };

      fetchAcademicsData();
    }
  }, [student]);

  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [aadhaarLink, setAadhaarLink] = useState("");

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async (sid) => {
    try {
      const { data: studentData, error: studentError } = await supabase
        .from("student")
        .update({
          ...dataAll,
          resume_link: resumeLink,
          aadhaar_link: aadhaarLink,
        })
        .eq("id", dataAll.id);

      if (studentError) {
        throw studentError;
      }

      if (academicsExists) {
        const { data: academicsData, error: academicsError } = await supabase
          .from("academics")
          .update({
            cgpa: academics.cgpa,
            backlogs: academics.backlogs,
          })
          .eq("student_id", dataAll.id);

        if (academicsError) {
          throw academicsError;
        }
      } else {
        const { data: academicsData, error: academicsError } = await supabase
          .from("academics")
          .insert({
            student_id: dataAll.id,
            cgpa: academics.cgpa,
            backlogs: academics.backlogs,
          });

        if (academicsError) {
          throw academicsError;
        }
        setAcademicsExists(true); // Now academics data exists
      }

      // Fetch updated data
      await fetchUpdatedData(dataAll.id);

      setEditMode(false);
      setAddingSkill(false);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleAcademicsChange = (field, value) => {
    setAcademics((prevAcademics) => ({
      ...prevAcademics,
      [field]: value,
    }));
  };

  const fetchUpdatedData = async (sid) => {
    try {
      const { data: updatedStudentData, error: studentError } = await supabase
        .from("student")
        .select()
        .eq("id", sid);
      if (studentError) {
        throw studentError;
      }
      setDataAll(updatedStudentData[0]);

      const { data: updatedAcademicsData, error: academicsError } =
        await supabase.from("academics").select().eq("student_id", sid);
      if (academicsError) {
        throw academicsError;
      }
      if (updatedAcademicsData.length > 0) {
        setAcademics(updatedAcademicsData[0]);
      }
    } catch (error) {
      console.error("Error fetching updated data:", error.message);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setNewSkill("");
    setAddingSkill(false);
  };

  const handleAddSkill = () => {
    setAddingSkill(true);
  };

  const handleRemoveSkill = (indexToRemove) => {
    setDataAll((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, index) => index !== indexToRemove),
    }));
    setAddingSkill(false);
  };

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
        .eq("student_id", dataAll.id);
      if (error) {
        throw error;
      }
      setAcademics((prevAcademics) => ({
        ...prevAcademics,
        verified: 1,
      }));
      window.alert("Verification Successful!");
    } catch (error) {
      console.error("Error updating verification status:", error.message);
    }
  };

  return (
    <div className="bg-background-clr text-primary-text font-gabarito">
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
              <p className="mb-[10px]">USN: {dataAll?.usn}</p>
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
                    value={academics.cgpa}
                    onChange={(e) =>
                      handleAcademicsChange("cgpa", e.target.value)
                    }
                  />
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center ml-auto h-8">
                    {academics.cgpa}
                  </div>
                )}
              </div>
            </div>
            <div className="flex mb-4 items-center">
              <div className="w-2/3">
                <label className="block text-white">Backlogs:</label>
              </div>
              <div className="w-2/3">
                {editMode ? (
                  <input
                    type="text"
                    className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8"
                    value={academics.backlogs}
                    onChange={(e) =>
                      handleAcademicsChange("backlogs", e.target.value)
                    }
                  />
                ) : (
                  <div className="text-white bg-secondary-card rounded-md w-full p-2 text-center h-8">
                    {academics.backlogs}
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
              {isVerify ? (
                <button
                  className="bg-logo-bg text-black font-bold px-10 py-1 rounded-md"
                  onClick={handleVerifyClick}
                >
                  {isVerify ? "Verify" : "Edit"}
                </button>
              ) : (
                <button
                  className={`${academics.verified === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-logo-bg"
                    } text-black font-bold px-4 py-2 rounded-md ml-2`}
                  onClick={editMode ? handleSaveClick : handleEditClick}
                  disabled={academics.verified === 1} // Disable if verification status is 1
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
