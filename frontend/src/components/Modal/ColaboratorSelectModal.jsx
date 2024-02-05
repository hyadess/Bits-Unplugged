import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const SetterListModal = ({ setters, onClose, onAdd }) => {
  const [selectedSetters, setSelectedSetters] = useState([]);

  const handleCheckboxChange = (setter) => {
    if (selectedSetters.includes(setter)) {
      setSelectedSetters(selectedSetters.filter((id) => id !== setter.id));
    } else {
      setSelectedSetters([...selectedSetters, setter]);
    }
  };

  const handleAddButtonClick = () => {
    // Pass the selected setters to the parent component
    console.log("Selected Setters:", setters);
    onAdd(selectedSetters);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="rounded-lg shadow-md p-8 text-center relative bg-white max-w-[800px] h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <CancelIcon />
        </button>
        <div className="p-4">
          <h2 className="text-3xl font-bold text-primary mb-6">Select Collaborators</h2>
          <div className="max-h-[60vh] overflow-y-auto">
            {setters.map((setter) => (
              <div
                key={setter.id}
                className="flex flex-row items-center mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer"
              >
                <Checkbox
                  checked={selectedSetters.includes(setter)}
                  onChange={() => handleCheckboxChange(setter)}
                  color="primary"
                />
                <img
                  src={setter.image}
                  alt={`${setter.username}'s profile`}
                  className="ml-4 w-10 h-10 rounded-full"
                />
                <span className="ml-4 font-medium text-gray-800 text-lg hover:underline">
                  {setter.username}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button
              onClick={handleAddButtonClick}
              variant="contained"
              color="primary"
              className="w-full"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetterListModal;
