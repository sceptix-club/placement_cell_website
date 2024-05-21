"use client";

import React, { useState, useEffect } from "react";
import ProfileComponent from "../../../components/ProfileComponent";
import supabase from '@/data/supabase';
import { useParams } from 'next/navigation';

const VerifyPage = () => {
  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.log('ID is not yet available.');
      return;
    }

    console.log('ID from URL:', id);

    const fetchStudentData = async () => {
      try {
        const { data: studentData, error } = await supabase
          .from("student")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (studentData) {
          setStudentData(studentData); // Set the fetched student data in state
        }
      } catch (error) {
        console.error("Error fetching student data:", error.message);
      }
    };

    fetchStudentData();
  }, [id]);

  // if (!id) {
  //   return <div>Loading...</div>; // Render loading state while ID is not available
  // }

  return <ProfileComponent routePrefix="verify" isVerify student={studentData} />;
};

export default VerifyPage;
