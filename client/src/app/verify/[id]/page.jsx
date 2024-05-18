"use client";

import React, { useState, useEffect } from "react";
import ProfileComponent from "../../../components/ProfileComponent";
const [mentees, setMentees] = useState([]);
const checkUserStatus = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    if (data.session == null) {
      router.push("/login");
      return;
    }
    const { user } = data.session;

    // Fetch the user_id from the user table
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("id")
      .eq("user_id", user.id);
    if (userError) {
      throw userError;
    }
    const uid = userData[0].id;
    console.log("is", uid);

    // Fetch data from the student table using user_id
    const { data: studentData, error: studentError } = await supabase
      .from("student")
      .select()
      .eq("user_id", uid);
    if (studentError) {
      throw studentError;
    }
    const sid = studentData[0].id;
    console.log("Student data:", studentData[0]);
    setDataAll(studentData[0]);
    setVerified(true); // Assuming user is verified if data is successfully fetched
    onUidChange(sid);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Handle error state or show appropriate message to the user
  }
};
checkUserStatus();


const VerifyPage = () => {
  return <ProfileComponent routePrefix="verify" isVerify />;
};

export default VerifyPage;
