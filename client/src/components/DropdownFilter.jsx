import React, { useState } from "react";

function Dropdown({
  options,
  handleOptionChange,
  selectedOptions,
  title,
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <button
        className="flex justify-between w-full p-1 text-left text-lg"
        onClick={() => setShowOptions(!showOptions)}
      >
        {title}
        <span
          className={`text-text_col_1 transition-transform duration-200 ${
            showOptions ? "transform rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <hr className="border-gray-200" />
      {showOptions && (
        <div className="w-full text-white p-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center p-1">
              <input
                type="checkbox"
                id={`${title}-${index}`}
                name={`${title}-${index}`}
                value={option}
                className="scale-125 cursor-pointer mr-2"
                checked={selectedOptions.includes(option)}
                onChange={(event) => {
                  console.log(
                    `Option: ${option}, Checked: ${event.target.checked}`
                  );
                  handleOptionChange(option, event.target.checked);
                }}
              />
              <label htmlFor={`${title}-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
