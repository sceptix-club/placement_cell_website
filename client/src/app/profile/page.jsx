"use client";
import React, { useState, useEffect } from "react";
import ProfileComponent from "../../components/ProfileComponent";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null); // State to store fetched data
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchDataAndLoad = async () => {
      try {
        // Simulate data fetching
        const fetchData = async () => {
          const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // Example API call
          const result = await response.json();
          setData(result);
        };

        const fetchTimeout = fetchData(); // Actual data fetching
        const animationTimeout = new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second loading animation

        await Promise.all([fetchTimeout, animationTimeout]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataAndLoad();
  }, []);

  const handleSaveClick = () => {
    // Simulate saving data logic here
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#222222]">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <>
      <ProfileComponent routePrefix="profile" onSave={handleSaveClick} data={data} />
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