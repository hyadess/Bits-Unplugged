import React from "react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contestApi } from "../../../api";
import { useContestContext } from "../../../store/ContestContextProvider";
import { showSuccess } from "../../../App";

const DetailsTab = () => {
  const { state: contest, dispatch } = useContestContext();

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
              type: "UPDATE_TITLE",
              payload: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Details</div>
        <textarea
          value={contest.details}
          name="details"
          className="border rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          placeholder="Contest Details"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Start Date</div>
        <input
          value={contest.startDate}
          type="datetime-local"
          name="startDate"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_START_DATE",
              payload: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">End Date</div>
        <input
          value={contest.endDate}
          type="datetime-local"
          name="endDate"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_END_DATE",
              payload: e.target.value,
            })
          }
        />
      </div>

      {/* Check if collaborators array is not empty before rendering the list */}
      {contest.collaborators && contest.collaborators.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="bu-text-primary text-2xl font-medium">Collaborators</div>
          <ul>
            {contest.collaborators.map((collaborator) => (
              <li key={collaborator.id}>{collaborator.username}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="bu-button-primary flex flex-row items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-center text-lg font-semibold focus:outline-none"
        onClick={async () => {
          const result = await contestApi.updateDetails(contest.id, {
            title: contest.title,
            details: contest.details,
            startDate: contest.startDate,
            endDate: contest.endDate,
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
