import { FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
const useStyles = makeStyles((theme) => ({
  root: {
    font: "white",
    "& .MuiFormLabel-root-MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000000", // Change this to the desired border color
      },
      "&:hover fieldset": {
        borderColor: "#ff479a", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff479a", // Border color on focus
      },
    },
  },
  multilineColor: {
    color: "white",
  },
}));


const SearchBar = ({ setSearchQuery, label, setSearch }) => {
  const classes = useStyles();
  return (
    <div className="relative flex items-center w-full transition-all duration-300">
      <input
        // value={props.value}
        type="name"
        // name={props.name}
        // id={props.id}
        className="sm:text-sm rounded-lg block w-full p-2.5 pr-10 bu-bg-color bu-text-primary placeholder-gray-400  focus:outline-none"
        placeholder="user name"
        // required={props.required}
        // onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setSearch(true)}
        onBlur={() => setSearch(false)}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="bu-text-primary">
          <SearchIcon />
        </div>
      </span>
    </div>
  );
};

export default SearchBar;
