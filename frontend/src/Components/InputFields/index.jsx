import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EyeIcon from "../Icons/EyeIcon";

// const SearchField = ({ setSearchQuery, label, setSearch }) => {
//   return (
//     <div className="relative flex items-center w-full transition-all duration-300">
//       <input
//         value={props.value}
//         type="name"
//         name={props.name}
//         id={props.id}
//         className="sm:text-sm rounded-lg block w-full p-2.5 pr-10 bu-bg-color bu-text-primary placeholder-gray-400  focus:outline-none"
//         placeholder="user name"
//         required={props.required}
//         onChange={(e) => props.onChange(e.target.value)}
//         onFocus={() => setSearch(true)}
//         onBlur={() => setSearch(false)}
//       />
//       <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
//         <div className="bu-text-primary">
//           <SearchIcon />
//         </div>
//       </span>
//     </div>
//   );
// };

export const TextField = (props) => {
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export const TextField2 = (props) => {
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange(props.id)}
      />
    </div>
  );
};

export const TextArea2 = (props) => {
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <textarea
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary m-0"
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange(props.id)}
      />
    </div>
  );
};

export const SelectionField = (props) => {
  return (
    <div className="w-full">
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <select
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {/* <option value="" disabled hidden>
          Select an option
        </option> */}
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectionField2 = (props) => {
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <select
        value={props.value}
        type="text"
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange(props.id)}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const PasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <div className="relative items-center w-full">
        <input
          value={props.value}
          type={showPassword ? "text" : "password"}
          name={props.name}
          id={props.id}
          className="sm:text-sm rounded-lg block w-full p-2.5 pr-10 border bu-input-primary"
          placeholder="••••••••"
          required={props.required}
          onChange={(e) => props.setValue(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="bu-text-primary">
            <EyeIcon
              isVisible={props.value.length > 0}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
        </span>
      </div>
    </div>
  );
};

// export default SearchBar;
