import React, { useState, useEffect, Suspense } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Title from "../Title";
import AddIcon from "@mui/icons-material/Add";

const SearchModal = ({ label, list, onSearch, onClose }) => {
  const [inputValue, setInputValue] = useState("");


  return (
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
          {
            list.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 border-b border-gray-200"
                onClick={() => onSearch(item)}
              >
                {item.username}
                
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
};

export default SearchModal;
