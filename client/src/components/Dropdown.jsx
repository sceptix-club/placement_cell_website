import CreatableSelect from "react-select/creatable";

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
    { value: "MECH", label: "MECH"},
    { value: "CIVIL", label: "CIVIL"},
    { value: "CSBS", label: "CSBS"},
  ];
  const Skills = [
    { value: "React", label: "React" },
    { value: "AStro", label: "AStro" },
    { value: "Baking", label: "Baking" },
  ];

const Dropdown = ({options}) => {
  const handleChange = (selectedOption, actionMeta) => {
  };
  const handleInputChange = (inputValue, actionMeta) => {
  };
  const Styles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#393939',
      border: 'none',
      boxShadow: 'none',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#393939',
      }),
      option: (provided,state) => ({
        ...provided,
        color: '#ffffff',
        backgroundColor: state.isFocused ? '#656565' : null, 
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#ffffff',
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#ffffff',
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: '#ffffff',
        ':hover': {
          color: '#ffffff',
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#8b8b8b',
        color: '#ffffff',
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: '#ffffff',
      }),
  };
console.log(options);
  return (
    <div>
    <CreatableSelect 
      options={CGPA}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isMulti
      styles={Styles}
      placeholder="CGPA"
    />
    <hr />
    <CreatableSelect 
      options={Branch}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isMulti
      styles={Styles}
      placeholder="Branch"
    />
    <hr />
    <CreatableSelect 
      options={Skills}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isMulti
      styles={Styles}
      placeholder="Skills"
    />
    <hr />
    </div>
  );
  };
export default Dropdown;