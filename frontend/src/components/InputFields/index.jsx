import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EyeIcon from "../Icons/EyeIcon";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

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

export const SelectionField3 = (props) => {
  function getColorModeFromLocalStorage() {
    return localStorage.getItem("color-theme") || "light";
  }

  const [colorMode, setColorMode] = useState(getColorModeFromLocalStorage());

  useEffect(() => {
    const handleStorageChange = (event) => {
      setColorMode(getColorModeFromLocalStorage);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <FormControl
      fullWidth
      className=" input-field"
      variant="outlined"
      size={props.size === undefined ? "small" : props.size}
    >
      <InputLabel
        htmlFor="outlined-adornment"
        className="input-label"
        sx={{
          "&.Mui-focused": {
            color: "#000000 !important",
            fontWeight: "bold",
          },
        }}
      >
        {props.label}
      </InputLabel>
      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange(props.id)}
        input={<OutlinedInput label={props.label} />}
        // MenuProps={MenuProps}
        label={props.label}
        sx={{
          // color: "white",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000",
            borderRadius: ".4rem",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colorMode === "light" ? "#1c5b5f" : "rgb(214,31,105)",
            borderWidth: ".15rem",
            borderRadius: ".4rem",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colorMode === "light" ? "#1c5b5f" : "rgb(214,31,105)",
          },
          "&.Mui-focused": {
            color: "#000000 !important",
          },
        }}
      >
        {props.options.map((value) => (
          <MenuItem
            key={value}
            value={value}
            // sx={{ height: "2rem" }}
            // style={getStyles(name, personName, theme)}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
