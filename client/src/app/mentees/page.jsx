'use client';
import { useState, useEffect } from 'react';
import MenteeCard from '@/components/MenteeCard.jsx';
// import mentees from '../../../public/MenteeTestData.js';
import supabase from '@/data/supabase';

export default function page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMentorUSN, setNewMentorUSN] = useState('');
  const [mentees, setMentees] = useState([]);
  const [loggedInMentorID, setLoggedInMentorID] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        const { user } = data.session;
        const { data: currentUser, error: userError } = await supabase
          .from('user')
          .select('id')
          .eq('user_id', user.id);

        if (userError) {
          throw userError;
        }

        const mentorID = currentUser[0].id;
        setLoggedInMentorID(mentorID);
        const { data: menteesDetails, error: fetchError } = await supabase
          .from('student_mentor')
          .select(`
            student_id,
            student(
              *
            )
          `)
          .eq('mentor_id', mentorID);

        if (fetchError) {
          throw fetchError;
        }

        setMentees(menteesDetails);
      } catch (error) {
        console.log('Error fetching mentees: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchMentees();
  }, [loggedInMentorID]);

  const handleAddMentor = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewMentorUSN('');
  };

  const handleAddUSN = async () => {
    try {
      const { data: studentData, error: studentError } = await supabase
        .from('student')
        .select('id')
        .eq('usn', newMentorUSN)
        .single();
      const { data, error } = await supabase.auth.getSession();
      const { user } = data.session;
      const { data: currentUser, error: userError } = await supabase
        .from('user')
        .select('id')
        .eq('user_id', user.id);

      if (studentError) {
        throw studentError;
      }

      const studentUserId = studentData.id;
      const uid = currentUser[0].id;
      const { error: insertError } = await supabase
        .from('student_mentor')
        .insert([{ student_id: studentUserId, mentor_id: uid }]);

      const { data: studentDetails, error: studentDetailsError } = await supabase
        .from('student_mentor')
        .select(`
          student_id,
          student(
            *
          )
        `)
        .eq('mentor_id', uid);

      if (!error) {
        setMentees(studentDetails);
      }

      if (insertError) {
        throw insertError;
      }

      setIsDialogOpen(false);
      setNewMentorUSN('');
    } catch (error) {
      console.log('Error adding mentee: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className='loading loading-dots loading-md'></span>
      </div>
    );
  }

  return (
    <div className='py-10'>
      <button
        className='px-4 py-2 bg-green-600 ml-20 text-white rounded shadow hover:bg-logo-bg'
        onClick={handleAddMentor}
      >
        Add Your Mentee
      </button>
      {isDialogOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded shadow-lg'>
            <p className='text-lg text-black font-medium mb-4'>
              Enter Mentee USN:
            </p>
            <input
              type='text'
              value={newMentorUSN}
              onChange={e => setNewMentorUSN(e.target.value)}
              className='border text-black bg-gray-300 border-gray-300 rounded px-3 py-2 w-full mb-4'
            />
            <div className='flex justify-end'>
              <button
                className='px-4 py-2 bg-gray-300 text-gray-800 rounded shadow mr-2 hover:bg-gray-400'
                onClick={handleDialogClose}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-logo-bg'
                onClick={handleAddUSN}
              >
                Add Mentee
              </button>
            </div>
          </div>
        </div>
      )}
      <p className='px-20 py-4 text-3xl font-medium'>Your Mentees</p>
      <div className='flex flex-wrap justify-center mx-1 py-5 gap-4'>
        {mentees !== null &&
          mentees.map((mentee, index) => (
            <div key={index} className='w-64 mt-3'>
              <MenteeCard props={mentee} />
            </div>
          ))}
      </div>
    </div>
  );
}
