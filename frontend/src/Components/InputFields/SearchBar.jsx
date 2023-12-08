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
    <FormControl className="search-bar" fullWidth>
      <TextField
        id="input-with-icon-textfield"
        className={classes.root}
        label={label}
        InputLabelProps={{
          sx: {
            // set the color of the label when not shrinked
            color: "black",
            [`&.${inputLabelClasses.shrink}`]: {
              // set the color of the label when shrinked (usually when the TextField is focused)
              color: "#ff479a",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
          className: classes.multilineColor,
        }}
        // onInput={(e) => {
        //   setSearchQuery(e.target.value);
        // }}
        size="small"
        variant="outlined"
        onFocus={() => setSearch(true)}
        onBlur={() => setSearch(false)}
        // fullWidth
      />
    </FormControl>
  );
};

export default SearchBar;
