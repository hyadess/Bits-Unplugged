import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Select, MenuItem } from "@mui/material";
const SelectionField = (props) => {
  return (
    <FormControl
      fullWidth
      className="input-field"
      variant="outlined"
      size="small"
    >
      <InputLabel htmlFor="outlined-adornment" className="input-label">
        {props.label}
      </InputLabel>
      <Select
        required
        id="outlined-adornment"
        className="outlined-input"
        value={props.value}
        onChange={props.onChange}
        input={<OutlinedInput label={props.label} />}
        size="small"
        sx={{ height: "100%" }}
        // MenuProps={MenuProps}
        // MenuProps={MenuProps}
      >
        {props.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            // sx={{ height: "2rem" }}
            // style={getStyles(name, personName, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectionField;
