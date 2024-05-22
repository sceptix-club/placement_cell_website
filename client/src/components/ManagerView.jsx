"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/data/supabase";
import { usePathname } from "next/navigation";
import FetchUidComponent from "@/app/api/fetchUid";

export default function ManagerView() {
  const router = useRouter();
  const [uid, setUid] = useState(null);
  const [roleIds, setRoleIds] = useState([]);
  const [roles, setRoles] = useState([]);
  const [questions, setquestions] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [students, setStudent] = useState([]);
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);

  useEffect(() => {
    // Fetch roles for the specific drive
    const fetchRoles = async () => {
      const { data: roleData, error: roleError } = await supabase
        // .schema('placements')
        .from("role")
        .select("*")
        .eq("drive_id", pathNo);
      if (!roleError) {
        setRoles(roleData);
        if (roleData && roleData.length > 0) {
          const roleIds = roleData.map((role) => role.id);
          setRoleIds(roleIds);
        }
      }
    };

    fetchRoles();
  }, [pathNo]);

  const handleManagerView = async () => {
    if (showRegistrations) {
      // Hide registrations if already shown
      setShowRegistrations(false);
      setRegistrations([]);
    } else {
      //Fetch questions from drive table of plaacements schema
      const { data: questionsData, error: questionsError } = await supabase
        // .schema("placements")
        .from("drive")
        .select("*")
        .eq("id", pathNo);

      if (!questionsError) {
        setquestions(questionsData);
      }

      // Fetch registrations for the specific role and drive
      const { data: registrationData, error: registrationError } =
        await supabase
          //   .schema("placements")
          .from("stat")
          .select("*")
          .eq("drive_id", pathNo)
          .in("role_id", roleIds);

      if (!registrationError) {
        setRegistrations(registrationData);
        setShowRegistrations(true);
      }
    }
  };
  // Fetch student data
  //     const { data: studentData, error: studentError } = await supabase
  //     .from("student")
  //     .select()
  //     .eq("id", student_id);
  //   if (!studentError) {
  //     setStudent(studentData);
  //   }

  return (
    <div>
      <FetchUidComponent setUid={setUid} />
      <button
        className="bg-logo-bg text-black font-bold  px-1 py-1 rounded-md mb-1 ml-1 mt-2 -m-3 text-sm"
        type="button"
        onClick={handleManagerView}
      >
        {showRegistrations ? "Hide Registrations" : "View Registrations"}
      </button>
      {showRegistrations && (
        <table className="border-collapse border border-gray-300">
          {registrations.length > 0 && (
            <thead>
              {questions.map((questions) => (
                <tr key={questions.id}>
                  <th className="border border-gray-300 px-4 py-2">
                    Student ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">
                    {questions.que1}
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    {questions.que2}
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    {questions.que3}
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    {questions.que4}
                  </th>
                  {/* Add more table headers as needed */}
                </tr>
              ))}
            </thead>
          )}
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.student_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.role_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.ans1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.ans2}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.ans3}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.ans4}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
