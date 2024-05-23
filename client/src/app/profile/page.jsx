"use client";
import React, { useState, useEffect } from "react";
import ProfileComponent from "../../components/ProfileComponent";

const ProfilePage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSaveClick = () => {
    // Simulate saving data logic here
    setShowToast(true);
    setTimeout(() => setShowToast(true), 3000); // Hide toast after 3 seconds
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#222222]">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <>
      <ProfileComponent routePrefix="profile" onSave={handleSaveClick} />
      {showToast && (
        <div
          className="fixed bottom-4 right-4 p-4 bg-green-500 text-black rounded shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <span>Saved successfully.</span>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
