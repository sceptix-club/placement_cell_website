"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import supabase from "@/data/supabase";
import { usePathname } from "next/navigation";
import FetchUidComponent from "@/app/api/fetchUid";
import QuestionPopup from "@/components/QuestionPopup";

export default function Page() {
  const router = useRouter();
  const [registeredRoles, setRegisteredRoles] = useState([]);
  const [uid, setUid] = useState(null);
  const [placements, setPlacements] = useState([]);
  const [roles, setRoles] = useState([]);
  const [studentSem, setStudentSem] = useState(null);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);

  useEffect(() => {
    const fetchPlacement = async () => {
      const { data, error } = await supabase
        .from("drive")
        .select("*")
        .eq("id", pathNo)
        .single();
      if (!error) {
        setPlacements(data);
      } else {
        console.error("Error fetching placements:", error.message);
      }
    };

    const fetchRoles = async () => {
      const { data: roleData, error: roleError } = await supabase
        .from("role")
        .select("*")
        .eq("drive_id", pathNo);
      if (!roleError) {
        setRoles(roleData);
      } else {
        console.error("Error fetching roles:", roleError.message);
      }
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
        .eq("drive_id", pathNo);

      if (!error) {
        setRegisteredRoles(data.map((stat) => stat.role_id));
      }
    };

    if (uid) {
      fetchStudentDetails(uid);
      checkRegistrationStatus(uid);
    }

    fetchPlacement();
    fetchRoles();
  }, [pathNo, uid]);

  const handleRegistration = async (roleId) => {
    const student_id = uid;

    const { data: existingStats, error: statsError } = await supabase
      .from("stat")
      .select()
      .eq("drive_id", pathNo)
      .eq("role_id", roleId)
      .eq("student_id", student_id);

    if (existingStats && existingStats.length > 0) {
      alert("You are already registered for this role in this drive.");
      return;
    }

    setSelectedRole(roleId);
    setShowQuestionPopup(true);
  };

  const handleRegistrationWithAnswers = async (answers) => {
    const student_id = uid;
    const roleId = selectedRole;

    const { error: insertError } = await supabase
      .from("stat")
      .insert([{ student_id, role_id: roleId, drive_id: pathNo, ...answers }]);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      return;
    }

    setRegisteredRoles([...registeredRoles, roleId]);
    alert("You have been successfully registered for this role.");

    setShowQuestionPopup(false);
  };

  const handleDisabledRegistrationClick = () => {
    if (registeredRoles.includes(selectedRole)) {
      alert("You are already registered for this role in this drive.");
    } else {
      alert("Registrations are open only for students in the 7th semester or higher.");
    }
  };

  return (
    <div>
      <FetchUidComponent setUid={setUid} />
      <section className="flex flex-wrap">
        {roles.map((role) => (
          <div key={role.id} className="flex flex-col items-start mb-2">
                <button
                  className={`font-bold px-4 py-2 rounded-md text-sm text-white shadow ${
                    registeredRoles.includes(role.id) || studentSem < 7
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-logo-bg"
                  }`}
                  type="button"
                  onClick={
                    registeredRoles.includes(role.id) || studentSem < 7
                      ? handleDisabledRegistrationClick
                      : () => handleRegistration(role.id)
                  }
                  disabled={registeredRoles.includes(role.id) || (studentSem !== null && studentSem < 7)}
                >
                  REGISTER
                </button>
                {registeredRoles.includes(role.id) && (
                  <span className="text-xs text-red-500 ml-5">
                    You have already registered.
                  </span>
                )}
                {studentSem < 7 && studentSem !== null && !registeredRoles.includes(role.id) && (
                  <span className="text-xs text-red-500 ml-5">
                    (Open for 7th semester and above)
                  </span>
                )}
          </div>
        ))}
      </section>

      {showQuestionPopup && selectedRole && (
        <QuestionPopup
          driveId={pathNo}
          roleId={selectedRole}
          uid={uid}
          onClose={() => setShowQuestionPopup(false)}
          onRegister={handleRegistrationWithAnswers}
        />
      )}
    </div>
  );
}
