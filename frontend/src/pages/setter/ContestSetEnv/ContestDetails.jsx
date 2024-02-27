import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authApi, contestApi } from "../../../api";
import { useContestContext } from "../../../store/ContestContextProvider";
import { showSuccess } from "../../../App";
import InviteButton from "../../../components/Buttons/InviteButton";
import SetterListModal from "../../../components/Modal/ColaboratorSelectModal";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const DetailsTab = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState(false);
  const [timeString, setTimeString] = useState("");
  const navigate = useNavigate();

  const { state: contest, dispatch } = useContestContext();
  const [userId, setUserId] = useState(null);

  const fetchUser = async () => {
    const decoded = jwtDecode(localStorage.getItem("token")).userId;
    setUserId(decoded);
  };

  useEffect(() => {
    getCollaborators();
    fetchUser();
  }, []);

  useEffect(() => {
    const date = new Date(contest.startDateTime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    setTimeString(`${hours}:${minutes}`);
  }, [contest.startDateTime]);
  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const getCollaborators = async () => {
    const res = await contestApi.availableCollaborators(contest.id);
    if (res.success) {
      console.log(res.data);
      setCollaborators(res.data);
    }
  };

  const publish = async () => {
    await contestApi.publishContest(contest.id);
  };

  return (
    <>
      {/* <InviteButton onClick={handleAddModalOpen} /> */}

      <button
        className="flex flex-row gap-2 justify-center items-center bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-semibold"
        onClick={() => {
          publish();
          navigate(`/setter/contests`);
        }}
      >
        <FontAwesomeIcon icon={faUpload} size="lg" />
        <h1>PUBLISH</h1>
      </button>

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
          value={
            contest.startDateTime
              ? new Date(contest.startDateTime).toISOString().split("T")[0]
              : undefined
          }
          type="date"
          name="endDate"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          onChange={(e) => {
            const date = new Date(contest.startDateTime);
            const [year, month, day] = e.target.value.split("-");
            date.setFullYear(parseInt(year, 10));
            date.setMonth(parseInt(month, 10) - 1); // Months are 0-indexed in JavaScript
            date.setDate(parseInt(day, 10));
            dispatch({
              type: "UPDATE_CONTEST_DATE_TIME",
              payload: date,
            });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">Start Time</div>
        <input
          value={contest.startDateTime ? timeString : undefined}
          type="time"
          name="endDate"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            const date = new Date(contest.startDateTime);
            date.setHours(parseInt(hours, 10));
            date.setMinutes(parseInt(minutes, 10));
            dispatch({
              type: "UPDATE_CONTEST_DATE_TIME",
              payload: date,
            });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bu-text-primary text-2xl font-medium">
          Duration (Hours)
        </div>
        <input
          value={contest.duration}
          type="number"
          className="border text-[140%] rounded-lg block w-full p-2.5 px-5 bu-input-primary"
          step={0.01}
          placeholder="3"
          min={0}
          onChange={(e) => {
            // if (e.target.value < 0) return;
            dispatch({
              type: "UPDATE_DURATION",
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
          const result = await contestApi.updateContest(contest.id, contest);
          showSuccess("Details saved successfully", result);
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
