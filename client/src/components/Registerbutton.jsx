"use client";

import { useState, useEffect } from "react";
import supabase from "@/data/supabase";
import QuestionPopup from "@/components/QuestionPopup";

const RegisterButton = ({ role }) => {
  const [uid, setUid] = useState(null);
  const [studentSem, setStudentSem] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [registeredRoles, setRegisteredRoles] = useState([]);

  useEffect(() => {
    const fetchUid = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUid(user.id);
    };

    const fetchStudentDetails = async (studentId) => {
      const { data, error } = await supabase
        .from("student")
        .select("sem")
        .eq("id", studentId)
        .single();
      if (!error) {
        setStudentSem(data.sem);
      } else {
        console.error("Error fetching student details:", error.message);
      }
    };

    const checkRegistrationStatus = async (studentId) => {
      const { data, error } = await supabase
        .from("stat")
        .select("role_id")
        .eq("student_id", studentId)
        .eq("drive_id", role.drive_id);

      if (!error) {
        const registeredRoles = data.map((stat) => stat.role_id);
        setRegisteredRoles(registeredRoles);
        setRegistered(registeredRoles.includes(role.id));
      } else {
        console.error("Error checking registration status:", error.message);
      }
    };

    if (uid) {
      fetchStudentDetails(uid);
      checkRegistrationStatus(uid);
    } else {
      fetchUid();
    }
  }, [uid, role]);

  const handleRegistration = () => {
    setShowQuestionPopup(true);
  };

  const handleRegistrationWithAnswers = async (answers) => {
    const { error: insertError } = await supabase
      .from("stat")
      .insert([{ student_id: uid, role_id: role.id, drive_id: role.drive_id, ...answers }]);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      return;
    }

    setRegisteredRoles([...registeredRoles, role.id]);
    setRegistered(true);
    alert("You have been successfully registered for this role.");
    setShowQuestionPopup(false);
  };

  return (
    <div>
      <button
        className={`font-bold px-4 py-2 rounded-md text-sm text-white shadow ${
          registered || studentSem < 7
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-logo-bg"
        }`}
        type="button"
        onClick={
          registered || studentSem < 7
            ? null
            : handleRegistration
        }
        disabled={registered || (studentSem !== null && studentSem < 7)}
        style={{ fontSize: "1rem" }}
      >
        REGISTER
      </button>
      {registered && (
        <span className="text-xs text-red-500 ml-5" style={{ fontSize: "1rem" }}>
          You have already registered.
        </span>
      )}
      {studentSem < 7 && studentSem !== null && !registered && (
        <span className="text-xs text-red-500 ml-5" style={{ fontSize: "1rem" }}>
          (Open for 7th semester and above)
        </span>
      )}

      {showQuestionPopup && (
        <QuestionPopup
          driveId={role.drive_id}
          roleId={role.id}
          uid={uid}
          onClose={() => setShowQuestionPopup(false)}
          onRegister={handleRegistrationWithAnswers}
        />
      )}
    </div>
  );
};

export default RegisterButton;
