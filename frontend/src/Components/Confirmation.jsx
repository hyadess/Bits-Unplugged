import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const Confirmation = ({ open, setOpen, onConfirm, param }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to continue?
      </DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          className="red-button"
        >
          <CloseIcon />
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            param ? onConfirm(param) : onConfirm();
          }}
          className="blue-button"
          autoFocus
        >
          <DoneIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
