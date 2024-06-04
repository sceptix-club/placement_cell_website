import React, { useState, useEffect, useCallback } from "react";
import supabase from "@/data/supabase";

const QuestionPopup = ({ driveId, roleId, uid, onClose, onRegister }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [roleName, setRoleName] = useState("");
  const [driveName, setDriveName] = useState("");
  const [driveDate, setDriveDate] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch drive name and date
      const { data: driveData, error: driveError } = await supabase
        .from("drive")
        .select("name, date")
        .eq("id", driveId);

      if (!driveError && driveData && driveData.length > 0) {
        setDriveName(driveData[0].name);
        setDriveDate(driveData[0].date);
      }

      // Fetch role name
      const { data: roleData, error: roleError } = await supabase
        .from("role")
        .select("name")
        .eq("id", roleId);

      if (!roleError && roleData && roleData.length > 0) {
        setRoleName(roleData[0].name);
      }

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from("drive")
        .select("que1, que2, que3, que4")
        .eq("id", driveId);

      if (!questionsError && questionsData && questionsData.length > 0) {
        const questionKeys = Object.keys(questionsData[0]);
        const fetchedQuestions = questionKeys
          .map((key) => questionsData[0][key])
          .filter((question) => question !== null);
        setQuestions(fetchedQuestions);
      }
    };

    fetchData();
  }, [driveId, roleId]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`ans${index + 1}`]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all questions have been answered
    const unansweredQuestions = questions.some(
      (question, index) => !answers[`ans${index + 1}`]
    );

    if (unansweredQuestions) {
      setError("Please answer all the questions.");
      return;
    }

    onRegister(answers);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-black rounded-lg p-6 max-w-md w-full relative">
        <span
          className="absolute top-2 right-2 text-gray-300 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h1 className="text-lg font-semibold mb-4">
          You are registering for
          <span className="text-green-500"> {roleName} </span>
          in the drive
          <span className="text-green-500"> {driveName} </span>
          which is going to be held on
          <span className="text-green-500"> {driveDate} </span>
        </h1>
        <h2 className="text-lg font-semibold mb-4">Answer the questions:</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`question-${index}`}
                className="block text-sm font-medium text-white-400"
              >{`Question ${index + 1}: ${question}`}</label>
              <input
                id={`question-${index}`}
                type="text"
                value={answers[`ans${index + 1}`] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-white border-white-300 rounded-md"
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-logo-bg text-black font-bold px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionPopup;
