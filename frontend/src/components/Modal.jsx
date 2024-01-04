import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
const Modal = ({
  label,
  placeholder,
  isOpen,
  value,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="rounded-lg shadow-md p-[20px] text-center relative bu-nav-color w-[300px]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bu-text-primary"
          >
            <CancelIcon />
          </button>
          <div className="p-5">
            <h2 className="bu-text-primary mb-[10px]">{label}</h2>
            <div>
              <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bu-input-primary w-full p-[10px] mb-[10px] border border-solid border-gray-300 rounded-md outline-none"
              />
              <button
                onClick={onSubmit}
                className="font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Modal;
