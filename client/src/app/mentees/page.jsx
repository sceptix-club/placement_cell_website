'use client'
import { useState } from 'react';
import MenteeCard from "@/components/MenteeCard.jsx";
import mentees from "../../../public/MenteeTestData.js"

export default function page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMentorUSN, setNewMentorUSN] = useState('');
  const handleAddMentor = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddUSN = () => {

    setIsDialogOpen(false);
    setNewMentorUSN('');
  };
  return (
    <div className="py-10" >
      <button className="px-4 py-2 bg-logo-bg ml-20 text-white rounded shadow hover:bg-blue-600" onClick={handleAddMentor}>
        Add Your Mentee
      </button>
      <p className="px-20 py-4 text-3xl font-medium">Your Mentees</p>
      <div className="flex flex-wrap justify-center mx-1 py-5 gap-4">
        {mentees.map((user, index) => (
          <div key={index} className="w-64 mt-3">
            <MenteeCard {...user} />
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-medium mb-4">Enter Mentor USN:</p>
            <input
              type="text"
              value={newMentorUSN}
              onChange={(e) => setNewMentorUSN(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow mr-2 hover:bg-gray-400" onClick={handleDialogClose}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600" onClick={handleAddUSN}>
                Add USN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}