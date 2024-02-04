import React from "react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contestApi } from "../../../api"; // Assuming you have an API module for contests
import { useContestContext } from "../../../store/ContestContextProvider"; // Update the import
import { showSuccess } from "../../../App";

const DetailsTab = () => {
  const { state: contest, dispatch } = useContestContext(); // Update the context
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Title</div>
        <input
          value={contest.title}
          type="text"
          name="title"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          placeholder="Contest Title"
          required
          onChange={(e) =>
            dispatch({
              type: "UPDATE_TITLE", // Adjust the action type accordingly
              payload: e.target.value,
            })
          }
        />
      </div>
      {/* Add other fields for contest details, e.g., start date, end date, etc. */}
      <button
        className="bu-button-primary flex flex-row items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-center text-lg font-semibold focus:outline-none"
        onClick={async () => {
          const result = await contestApi.updateContest(contest.id, {
            title: contest.title,
            // Add other fields for contest update
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
