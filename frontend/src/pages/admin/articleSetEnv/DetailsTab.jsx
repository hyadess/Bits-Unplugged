import React from "react";
import ProblemStatement from "../../../components/Statement";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { problemApi } from "../../../api";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import { showSuccess } from "../../../App";
const DetailsTab = () => {
  const { state: problem, dispatch } = useProblemContext();
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Title</div>
        <input
          value={problem.title}
          type="text"
          name="title"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          placeholder="Example Problem Name"
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
        <div className="bu-text-primary text-2xl font-medium">Statement</div>
        <ProblemStatement />
      </div>
      <button
        className="bu-button-primary flex flex-row items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-center text-lg font-semibold focus:outline-none"
        onClick={async () => {
          const result = await problemApi.updateProblem(problem.id, {
            title: problem.title,
            statement: problem.statement,
          });
          showSuccess("Details saved successfully", result);
        }}
      >
        <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
        SAVE
      </button>
    </>
  );
};

export default DetailsTab;
