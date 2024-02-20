import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

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
        <button
          variant="contained"
          onClick={handleClose}
          className="font-bold rounded-lg text-3xl px-7 py-1 text-center bu-button-delete"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button
          // variant="contained"
          onClick={() => {
            handleClose();
            param ? onConfirm(param) : onConfirm();
          }}
          className="font-bold rounded-lg text-3xl px-7 py-1 text-center bu-button-primary"
          autoFocus
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
