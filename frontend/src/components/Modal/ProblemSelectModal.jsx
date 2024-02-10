import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const ProblemListModal = ({ problems, onClose, onAdd }) => {
  const [selectedProblems, setSelectedProblems] = useState([]);

  const handleCheckboxChange = (problem) => {
    if (selectedProblems.includes(problem)) {
      setSelectedProblems(selectedProblems.filter((id) => id !== problem.id));
    } else {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const handleAddButtonClick = () => {
    // Pass the selected problems to the parent component
    onAdd(selectedProblems);
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
          <h2 className="text-3xl font-bold text-primary mb-6">Select Problems</h2>
          <div className="max-h-[60vh] overflow-y-auto">
            {problems.map((problem) => (
              <div
                key={problem}
                className="flex flex-col items-start mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer"
              >
                <Checkbox
                  checked={selectedProblems.includes(problem)}
                  onChange={() => handleCheckboxChange(problem)}
                  color="primary"
                />
                <span className="ml-4 font-medium text-gray-800 text-lg hover:underline">
                  {problem.title}
                </span>
                <span className="text-gray-500 text-md mt-2 ml-4">
                   | Canvas: {problem.canvas.name}
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

export default ProblemListModal;
