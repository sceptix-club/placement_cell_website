import React, { useState } from "react";

const CGPA = [
  { value: "5.0", label: "5.0" },
  { value: "6.0", label: "6.0" },
  { value: "7.0", label: "7.0" },
  { value: "8.0", label: "8.0" },
  { value: "9.0", label: "9.0" },
  { value: "10.0", label: "10.0" },
];
const Branch = [
  { value: "CSE", label: "CSE" },
  { value: "CSDS", label: "CSDS" },
  { value: "ECE", label: "ECE" },
  { value: "EEE", label: "EEE" },
  { value: "MECH", label: "MECH" },
  { value: "CIVIL", label: "CIVIL" },
  { value: "CSBS", label: "CSBS" },
];
const Skills = [
  { value: "React", label: "React" },
  { value: "AStro", label: "AStro" },
  { value: "Baking", label: "Baking" },
  { value: "Cooking", label: "Cooking" },
  { value: "Dancing", label: "Dancing" },
  { value: "Eating", label: "Eating" },
  { value: "Fishing", label: "Fishing" },
  { value: "Gaming", label: "Gaming" },
  { value: "Hiking", label: "Hiking" },
  { value: "Jogging", label: "Jogging" },
  { value: "Kiting", label: "Kiting" },
  { value: "Lifting", label: "Lifting" },
  { value: "Meditating", label: "Meditating" },
];

const DropdownFilter = () => {
  const [selectedCGPA, setSelectedCGPA] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [showCGPAOptions, setShowCGPAOptions] = useState(false);
  const [showBranchOptions, setShowBranchOptions] = useState(false);
  const [showSkillsOptions, setShowSkillsOptions] = useState(false);

  const handleCGPAChange = (value) => {
    setSelectedCGPA(value);
    setShowCGPAOptions(false);
  };

  const handleBranchChange = (value) => {
    setSelectedBranch(value);
    setShowBranchOptions(false);
  };

  const handleSkillsChange = (value) => {
    setSelectedSkills(value);
    setShowSkillsOptions(false);
  };

  return (
    <div className="bg-primary-card">
      <button
        className="flex justify-between w-full p-1 text-left text-lg"
        onClick={() => setShowCGPAOptions(!showCGPAOptions)}
      >
        CGPA
        <span
          className={`text-text_col_1 transition-transform duration-200 ${
            showCGPAOptions ? "transform rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <hr className="border-gray-200" />
      {showCGPAOptions && (
        <div className="w-full text-white p-2">
          {CGPA.map((cgpa, index) => (
            <div key={index} className="flex items-center  p-1">
              <input
                type="checkbox"
                id={`cgpa-${index}`}
                name={`cgpa-${index}`}
                value={cgpa.value}
                className="scale-125 cursor-pointer"
              />
              <label
                htmlFor={`cgpa-${index}`}
                className="ml-2 text-base"
                onClick={() => handleCGPAChange(cgpa.value)}
              >
                {cgpa.label}
              </label>
            </div>
          ))}
        </div>
      )}
      <hr className="border-gray-200" />

      <button
        className="flex justify-between w-full p-1 text-left text-lg"
        onClick={() => setShowBranchOptions(!showBranchOptions)}
      >
        Branch
        <span
          className={`text-text_col_1 transition-transform duration-200 ${
            showBranchOptions ? "transform rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <hr className="border-gray-200" />
      {showBranchOptions && (
        <div className="w-full text-white p-2">
          {Branch.map((branch, index) => (
            <div key={index} className="flex items-center p-1">
              <input
                type="checkbox"
                id={`branch-${index}`}
                name={`branch-${index}`}
                value={branch.value}
                className="scale-125 cursor-pointer"
              />
              <label
                htmlFor={`branch-${index}`}
                className="ml-2 text-base"
                onClick={() => handleBranchChange(branch.value)}
              >
                {branch.label}
              </label>
            </div>
          ))}
        </div>
      )}
      <hr className="border-gray-200" />
      <button
        className="flex justify-between w-full p-1 text-left text-lg"
        onClick={() => setShowSkillsOptions(!showSkillsOptions)}
      >
        Skills
        <span
          className={`text-text_col_1 transition-transform duration-200 ${
            showSkillsOptions ? "transform rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <hr className="border-gray-200" />
      {showSkillsOptions && (
        <div className="w-full text-white p-2">
          {Skills.map((skill, index) => (
            <div key={index} className="flex items-center p-1">
              <input
                type="checkbox"
                id={`skill-${index}`}
                name={`skill-${index}`}
                value={skill.value}
                className="scale-125 cursor-pointer"
              />
              <label
                htmlFor={`skill-${index}`}
                className="ml-2 text-base"
                onClick={() => handleSkillsChange(skill.value)}
              >
                {skill.label}
              </label>
            </div>
          ))}
        </div>
      )}
      <hr className="border-gray-200" />
    </div>
  );
};

export default DropdownFilter;
