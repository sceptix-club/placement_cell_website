
'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'; 
import supabase from "@/data/supabase";
import { usePathname } from "next/navigation";
import FetchUidComponent from '@/app/api/fetchUid';
import RolesCard from "@/components/RolesCard";

import QuestionPopup from "@/components/QuestionPopup";

export default function Page() {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);
  const [uid, setUid] = useState(null);
  const [roleIds, setRoleIds] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false); // State to control the visibility of the question popup
  const pathName = usePathname();
  const pathNo = pathName.slice("/drive/".length);

  useEffect(() => {
    // Fetch placement data for the specific drive
    const fetchPlacement = async () => {
      const { data, error } = await supabase
        .schema('placements')
        .from('drive')
        .select('*')
        .eq('id', pathNo)
        .single();
      if (!error) {
        setPlacements(data);
      }
    };

    // Fetch roles for the specific drive
    const fetchRoles = async () => {
      const { data: roleData, error: roleError } = await supabase
        .schema('placements')
        .from('role')
        .select('*')
        .eq('drive_id', pathNo);
      if (!roleError) {
        setRoles(roleData);
        if (roleData && roleData.length > 0) {
          const roleIds = roleData.map(role => role.id);
          setRoleIds(roleIds);
        }
      }
    };

    fetchPlacement();
    fetchRoles();
  }, [pathNo]);

  // Handle registration for a specific role
  const handleRegistration = async (roleId) => {
    const student_id = uid;

    // Check if the student is already registered for this role
    const { data: existingStats, error: statsError } = await supabase
      .schema('placements')
      .from('stat')
      .select()
      .eq('drive_id', pathNo)
      .eq('role_id', roleId)
      .eq('student_id', student_id);

    if (existingStats && existingStats.length > 0) {
      alert('You are already registered for this role in this drive.');
      return;
    }

    // Show the question popup when registering for a role
    setShowQuestionPopup(true);
  };

  // Handle registration with answers
  const handleRegistrationWithAnswers = async (answers) => {
    const student_id = uid;
    const roleId = selectedRole.id;

    // Insert the student_id, roleId, and drive_id into the stat table along with answers
    const { error: insertError } = await supabase
      .schema('placements')
      .from('stat')
      .insert([{ student_id, role_id: roleId, drive_id: pathNo, ...answers }]);

    if (insertError) {
      console.error('Error inserting data:', insertError.message);
      return;
    }

    // Set registered state to true and show success message
    setRegistered(true);
    alert('You have been successfully registered for this role.');

    setShowQuestionPopup(false);
  };

  // Select the first role from the roles array
  const selectedRole = roles.length > 0 ? roles[0] : null;

  return (
    <div>
      <FetchUidComponent setUid={setUid} />
      <section className="flex flex-wrap">
        {selectedRole && (
          <div key={selectedRole.id} className="flex items-center">
            {/* <h3>{selectedRole.name}</h3> */}
            <button
              className="bg-logo-bg text-black font-bold  px-1 py-1 rounded-md mb-1 ml-1 mt-2 -m-3 text-sm"
              type="button"
              onClick={() => handleRegistration(selectedRole.id)}
              disabled={registered} 
            >
              REGISTER
            </button>
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
