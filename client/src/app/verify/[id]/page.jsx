"use client";

import React, { useState, useEffect } from "react";
import ProfileComponent from "../../../components/ProfileComponent";




const VerifyPage = () => {
  const [mentees, setMentees] = useState([])
  const [loggedInMentorID, setLoggedInMentorID] = useState(null)

  return <ProfileComponent routePrefix="verify" isVerify props={mentees} />;
};

export default VerifyPage;
