"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import supabase from "@/data/supabase";
import { usePathname } from "next/navigation";
import FetchUidComponent from "@/app/api/fetchUid";
import RolesCard from "@/components/RolesCard";
import QuestionPopup from "@/components/QuestionPopup";
export default function Page() {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);
  const [uid, setUid] = useState(null);
  const [roleIds, setRoleIds] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [roles, setRoles] = useState([]);
  const [studentSem, setStudentSem] = useState(null); // State to store student semester
  const [showQuestionPopup, setShowQuestionPopup] = useState(false); // State to control the visibility of the question popup
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
        if (roleData && roleData.length > 0) {
          const roleIds = roleData.map((role) => role.id);
          setRoleIds(roleIds);
        }
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
    if (uid) {
      fetchStudentDetails(uid);
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
    setShowQuestionPopup(true);
  };
  const handleRegistrationWithAnswers = async (answers) => {
    const student_id = uid;
    const roleId = selectedRole.id;

    const { error: insertError } = await supabase
      .from("stat")
      .insert([{ student_id, role_id: roleId, drive_id: pathNo, ...answers }]);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      return;
    }
    setRegistered(true);
    alert("You have been successfully registered for this role.");
    setShowQuestionPopup(false);
  };
  const selectedRole = roles.length > 0 ? roles[0] : null;
  const handleDisabledRegistrationClick = () => {
    alert("Registrations are open only for students in the 7th semester or higher.");
  };
  return (
    <div>
      <FetchUidComponent setUid={setUid} />
      <section className="flex flex-wrap">
        {selectedRole && (
          <div key={selectedRole.id} className="flex items-center">
            <button
              className={`font-bold px-4 py-2 rounded-md mb-1 ml-1 mt-2 -m-3 text-sm text-white shadow ${
                studentSem >= 7 ? "bg-green-600 hover:bg-logo-bg" : "bg-gray-400 cursor-not-allowed"
              }`}
              type="button"
              onClick={
                studentSem >= 7
                  ? () => handleRegistration(selectedRole.id)
                  : handleDisabledRegistrationClick
              }
              disabled={registered || (studentSem !== null && studentSem < 7)}
            >
              REGISTER
            </button>
            {studentSem < 7 && studentSem !== null && (
              <span className="text-xs text-red-500 ml-5">(Open for 7th semester and above)</span>
            )}
          </div>
        )}
      </section>
      {showQuestionPopup && (
        <QuestionPopup
          driveId={pathNo}
          roleId={selectedRole.id}
          uid={uid}
          onClose={() => setShowQuestionPopup(false)}
          onRegister={handleRegistrationWithAnswers}
        />
      )}
    </div>
  );
}