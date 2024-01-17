import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const NumberOfDisksInput = ({ numberOfDisks, handleNumberOfDisksChange }) => (
  <div className="no-ring-input w-20%">
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment" className="bu-text-primary">
        Number of Disks
      </InputLabel>
      <OutlinedInput
        required
        placeholder="# of disks"
        inputProps={{
          step: 1,
          min: 1,
          max: 10,
        }}
        id="outlined-adornment"
        className="outlined-input bu-text-primary"
        type="number"
        value={numberOfDisks}
        onChange={handleNumberOfDisksChange}
        label={"Number of Disks"}
        size="small"
      />
    </FormControl>
  </div>
);

export default NumberOfDisksInput;
