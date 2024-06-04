import { useState, useEffect } from "react";
import supabase from "@/data/supabase";
import { usePathname } from "next/navigation";
import FetchUidComponent from "@/app/api/fetchUid";
import QuestionPopup from "@/components/QuestionPopup";

const RegisterButton = ({ role }) => {
  const [uid, setUid] = useState(null);
  const [studentSem, setStudentSem] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [answers, setAnswers] = useState({});
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);

  useEffect(() => {
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
        setRegistered(data.map((stat) => stat.role_id).includes(role.id));
      }
    };

    if (uid) {
      fetchStudentDetails(uid);
      checkRegistrationStatus(uid);
    }
  }, [uid, role.id, pathNo]);

  const handleRegistration = async () => {
    if (registered) {
      alert("You are already registered for this role in this drive.");
      return;
    }

    setShowQuestionPopup(true);
  };

  const handleRegistrationWithAnswers = async (answers) => {
    const { error } = await supabase
      .from("stat")
      .insert([{ student_id: uid, role_id: role.id, drive_id: pathNo, ...answers }]);

    if (error) {
      console.error("Error inserting data:", error.message);
      return;
    }

    setRegistered(true);
    alert("You have been successfully registered for this role.");
    setShowQuestionPopup(false);
  };

  const handleDisabledRegistrationClick = () => {
    if (registered) {
      alert("You are already registered for this role in this drive.");
    } else {
      alert("Registrations are open only for students in the 7th semester or higher.");
    }
  };

  return (
    <div>
      <FetchUidComponent setUid={setUid} />
      <button
        className={`font-bold px-4 py-2 rounded-md text-sm text-white shadow ${
          registered || studentSem < 7 ? "bg-gray-400 mt-4 cursor-not-allowed" : "bg-green-600 mt-4 hover:bg-logo-bg"
        }`}
        type="button"
        onClick={registered || studentSem < 7 ? handleDisabledRegistrationClick : handleRegistration}
        disabled={registered || studentSem < 7}
      >
        REGISTER
      </button>
      {registered && (
        <div className="text-sm text-red-500 mt-2">
          You have already registered.
        </div>
      )}
      {studentSem < 7 && studentSem !== null && !registered && (
        <div className="text-sm text-red-500 mt-2">
          (Open for 7th semester and above)
        </div>
      )}

      {showQuestionPopup && (
        <QuestionPopup
          driveId={pathNo}
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
