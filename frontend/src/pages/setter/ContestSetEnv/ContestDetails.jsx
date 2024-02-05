import React, { useEffect, useState } from "react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authApi, contestApi } from "../../../api";
import { useContestContext } from "../../../store/ContestContextProvider";
import { showSuccess } from "../../../App";
import ProblemAddButton from "../../../components/Buttons/ProblemAddButton";
import SetterListModal from "../../../components/Modal/ColaboratorSelectModal";

const DetailsTab = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState(false);

  const { state: contest, dispatch } = useContestContext();
  useEffect(() => {
    getCollaborators();
    console.log(contest.startDate, contest.endDate);
  }, []);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const getCollaborators = async () => {
    const res = await contestApi.availableCollaborators();
    if (res.success) {
      console.log(res.data);
      setCollaborators(res.data);
    }
  };

  return (
    <>
      <ProblemAddButton onClick={handleAddModalOpen} />

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
          value={contest.description}
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
          // value={contest.endDate}
          type="datetime-local"
          name="endDate"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          onChange={(e) => {
            console.log("===>", typeof e.target.value);
            dispatch({
              type: "UPDATE_END_DATE",
              payload: e.target.value,
            });
          }}
        />
      </div>

      {/* Show contestsetters below End Date */}
      {contest.contestsetters && contest.contestsetters.length > 1 && (
        <div className="flex flex-col gap-2">
          <div className="bu-text-primary text-2xl font-medium">
            Contest Setters
          </div>
          <ul>
            {contest.contestsetters.map((contestsetter) => (
              <li key={contestsetter.id}>{contestsetter.username}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="bu-button-primary flex flex-row items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-center text-lg font-semibold focus:outline-none"
        onClick={async () => {
          const result = await contestApi.updateTitle(
            contest.id,
            contest.title
          );
          const result1 = await contestApi.updateDescription(
            contest.id,
            contest.details
          );
          const result2 = await contestApi.updateDates(
            contest.id,
            contest.startDate,
            contest.endDate
          );

          showSuccess(
            "Details saved successfully",
            result && result1 && result2
          );
        }}
      >
        {isAddModalOpen && (
          <SetterListModal
            setters={collaborators}
            onClose={handleAddModalClose}
            onAdd={handleAddModalClose}
          />
        )}
        <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
        SAVE
      </button>
    </>
  );
};

export default DetailsTab;
