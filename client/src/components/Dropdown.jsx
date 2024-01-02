// import React from 'react';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';

// const Options = [
//   { id: 1, value: "option1", label: "option1" },
//   { id: 2, value: "option2", label: "option2" },
//   { id: 3, value: "option3", label: "option3" },
//   { id: 4, value: "option4", label: "option4" },
// ];

// function Dropdown() {
//   return (
//     <div>
//       <FormControl style={{width: '20%'}}>
//         <Select>       </Select>
//           {Options.map((option) => (
//             <MenuItem key={option.id} value={option.value}>
//               <ListItemText primary={option.label} />
//             </MenuItem>
//           ))}
 
//       </FormControl>
//     </div>
//   );
// }

// export default Dropdown;
////////////////////////////////////////////////////////////////////////
// import CreatableSelect from "react-select/creatable";

// const Dropdown = () => {
//   const options = [
//     { value: "jack", label: "Jack", color: "#FF8B00" },
//     { value: "john", label: "John", color: "#36B37E" },
//     { value: "mike", label: "Mike", color: "#0052CC" },
//   ];
//   const colorStyles = {
//     control: (styles) => ({ ...styles, backgroundColor: "white" }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//       return { ...styles, color: data.color };
//     },
//     multiValue: (styles, { data }) => {
//       return {
//         ...styles,
//         backgroundColor: data.color,
//         color: "#fff",
//       };
//     },
//     multiValueLabel: (styles, { data }) => {
//       return {
//         ...styles,
//         color: "#fff",
//       };
//     },
//     multiValueRemove: (styles, { data }) => {
//       return {
//         ...styles,
//         color: "#fff",
//         cursor: "pointer",
//         ":hover": {
//           color: "#fff",
//         },
//       };
//     },
//   };
//   const handleChange = (selectedOption, actionMeta) => {
//     console.log("handleChange", selectedOption, actionMeta);
//   };
//   const handleInputChange = (inputValue, actionMeta) => {
//     console.log("handleInputChange", inputValue, actionMeta);
//   };
//   return (
//     <CreatableSelect
//       options={options}
//       onChange={handleChange}
//       onInputChange={handleInputChange}
//       isMulti
//       styles={colorStyles}
//     />
//   );
// };

// export default Dropdown;
///////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react'
// import { AiOutlineCaretDown } from 'react-icons/ai';
// import list from './components/list.json';

// console.log(list)

// function dropdown() {
//     const [isOpen, setIsOpen] = useState(false)
//   return (
//     <div className='relative flex flex-col items-center w-[340px] h-[340px] rounded-lg'>
//         <button onClick={() => setIsOpen((prev) => !prev)} className='bg-black p-4 w-full flex items-center text-white justify-between text-lg font-bold rounded-lg tracking-wider border-4 border-transparent active:border-black duraton-300 active:text-white'>
//             Dropdown
//             {!isOpen ? (
//                 <AiOutlineCaretDown className='h-8' />
//             ) : (
//                 <AiOutlineCaretDown className='h-8' />
//             )}
//         </button>

//         {isOpen && (
//             <div className='bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
//                 {list.map((item, i) => (
//                     <div className='flex w-full justify-between ' key={i}>
//                         <h3>{item.city}</h3>
//                         <h3>{item.country}</h3>
//                     </div>
//                 ))}
//             </div>
//         )}
//     </div>
//   )
// }

// export default dropdown
