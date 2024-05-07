'use client'
import { useState } from 'react';
import MenteeCard from "@/components/MenteeCard.jsx";
import mentees from "../../../public/MenteeTestData.js"
import supabase from "@/data/supabase";

export default function page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMentorUSN, setNewMentorUSN] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleAddMentor = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddUSN = async () => {
    try {
      const { data, error } = await supabase
        .from('student')
        .select('user_id')
        .eq('usn', newMentorUSN)
        .single();

      if (error) {
        throw error;
      }

      const studentId = data.user_id;
      const mentorId = 1;
      const { insertError } = await supabase
        .from('student_mentor')
        .insert([{ student_id: studentId, mentor_id: mentorId }]);

      if (insertError) {
        throw insertError;
      }

      setIsDialogOpen(false);
      setNewMentorUSN('');
    } catch (error) {
      setErrorMessage('Error adding mentee: ' + error.message);
    }
  };
  return (
    <div className="py-10" >
      <button className="px-4 py-2 bg-logo-bg ml-20 text-white rounded shadow hover:bg-green-600" onClick={handleAddMentor}>
        Add Your Mentee
      </button>
      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg text-black font-medium mb-4">Enter Mentee USN:</p>
            <input
              type="text"
              value={newMentorUSN}
              onChange={(e) => setNewMentorUSN(e.target.value)}
              className="border text-black border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow mr-2 hover:bg-gray-400" onClick={handleDialogClose}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-logo-bg text-white rounded shadow hover:bg-green-600" onClick={handleAddUSN}>
                Add Mentee
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="px-20 py-4 text-3xl font-medium">Your Mentees</p>
      <div className="flex flex-wrap justify-center mx-1 py-5 gap-4">
        {mentees.map((user, index) => (
          <div key={index} className="w-64 mt-3">
            <MenteeCard {...user} />
          </div>
        ))}
      </div>

    </div>
  );
}