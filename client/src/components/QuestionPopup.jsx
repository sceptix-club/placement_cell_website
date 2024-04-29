import React, { useState, useEffect } from 'react';
import supabase from "@/data/supabase";

const QuestionPopup = ({ driveId, roleId, uid, onClose, onRegister }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .schema('placements')
        .from('drive')
        .select('que1, que2, que3, que4')
        .eq('id', driveId);

      if (!error && data) {
        const questionKeys = Object.keys(data[0]);
        const fetchedQuestions = questionKeys.map(key => data[0][key]);
        setQuestions(fetchedQuestions);
      }
    };

    fetchQuestions();
  }, [driveId]);

  const handleAnswerChange = (index, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [`ans${index + 1}`]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(answers);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black rounded-lg p-6 max-w-md w-full">
        <span className="absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className="text-lg font-semibold mb-4">Answer the questions:</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`question-${index}`} className="block text-sm font-medium text-white-400">{`Question ${index + 1}: ${question}`}</label>
              <input
                id={`question-${index}`}
                type="text"
                value={answers[`ans${index + 1}`] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionPopup;
