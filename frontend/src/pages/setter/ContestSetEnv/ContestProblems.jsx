import React, { useState } from "react";
import ProblemStatement from "../../../components/Statement";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { problemApi } from "../../../api";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import { showSuccess } from "../../../App";

const ContestDetailsTab = () => {
  const { state: contest, dispatch } = useContestContext(); // Assuming you have a context for the contest state
  const [newProblem, setNewProblem] = useState({ title: "", statement: "" });

  const handleAddProblem = () => {
    // Add logic to handle adding a new problem to the contest
    // You can update the contest context or send an API request to add the problem
    // Reset the newProblem state afterward
  };

  const handleSaveDetails = async () => {
    // Add logic to save the contest details
    // You can send an API request to update the contest details
    // Optionally, you can show a success message
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Contest Title</div>
        <input
          value={contest.title}
          type="text"
          name="title"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          placeholder="Example Contest Name"
          required
          onChange={(e) =>
            dispatch({
              type: "UPDATE_TITLE",
              payload: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Contest Problems</div>
        {contest.problems.map((problem, index) => (
          <div key={index}>
            <div className="bu-text-primary text-xl font-medium">Problem {index + 1}</div>
            <input
              value={problem.title}
              type="text"
              name={`problem-title-${index}`}
              className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
              placeholder={`Problem ${index + 1} Name`}
              required
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PROBLEM_TITLE",
                  payload: { index, title: e.target.value },
                })
              }
            />
            <ProblemStatement
              statement={problem.statement}
              onChange={(newStatement) =>
                dispatch({
                  type: "UPDATE_PROBLEM_STATEMENT",
                  payload: { index, statement: newStatement },
                })
              }
            />
          </div>
        ))}
        <button
          className="bu-button-primary flex flex-row items-center justify-center gap-3 rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white focus:outline-none"
          onClick={handleAddProblem}
        >
          <FontAwesomeIcon icon={faPlus} size="sm" />
          Add New Problem
        </button>
      </div>
      <button
        className="bu-button-primary flex flex-row items-center justify-center gap-3 rounded-lg px-7 py-3.5 text-center text-lg font-medium text-white focus:outline-none"
        onClick={handleSaveDetails}
      >
        <FontAwesomeIcon icon={faFloppyDisk} size="sm" />
        SAVE
      </button>
    </>
  );
};

export default ContestDetailsTab;
