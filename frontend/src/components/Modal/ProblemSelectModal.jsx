import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const ProblemListModal = ({ problems, onClose, onAdd }) => {
  const [selectedProblems, setSelectedProblems] = useState([]);

  const handleCheckboxChange = (problemId) => {
    if (selectedProblems.includes(problemId)) {
      setSelectedProblems(selectedProblems.filter((id) => id !== problemId));
    } else {
      setSelectedProblems([...selectedProblems, problemId]);
    }
  };

  const handleAddButtonClick = () => {
    // Pass the selected problems to the parent component
    onAdd(selectedProblems);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="rounded-lg shadow-md p-6 text-center relative bg-white max-w-[600px] h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <CancelIcon />
        </button>
        <div className="p-4">
          <h2 className="font-bold ml-2 text-gray-800">Select Problems</h2>
          <div className="max-h-[60vh] overflow-y-auto">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="flex items-center mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              >
                <Checkbox
                  checked={selectedProblems.includes(problem.id)}
                  onChange={() => handleCheckboxChange(problem.id)}
                  color="primary"
                />
                <span className="ml-2 font-medium text-gray-800 hover:underline">
                  {problem.title}
                </span>
              </div>
            ))}
            </div>
          <div className="mt-14">
          <Button
            onClick={handleAddButtonClick}
            variant="contained"
            color="primary"
            className="w-full mt-4"
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
