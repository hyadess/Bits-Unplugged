import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { showSuccess } from "../../../App";
import { contestApi } from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContestContext } from "../../../store/ContestContextProvider";




const Collaborators = () => {
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [ContestCollaborators, setContestCollaborators] = useState([]);
  const [isListOpen, setListOpen] = useState(false);
  const [collaborators, setCollaborators] = useState(false);
  const { state: contest, dispatch } = useContestContext();


  useEffect(() => {
    if(contest.id !== undefined) getCollaborators();
  }, [contest]);


  const getCollaborators = async () => {
    const res = await contestApi.availableCollaborators(contest.id);
    const res2 = await contestApi.showAllCollaborators(contest.id);
    if (res.success) {
      console.log("collaborators: ", res2.data);
      setCollaborators(res.data);
      setContestCollaborators(res2.data);
    }
    return res;
  };

  const handleListToggle = async() => {
    const res= await getCollaborators();
    setListOpen(!isListOpen);
  };

  const handleCollaboratorSelect = (collaborator) => {
    if (selectedCollaborators.includes(collaborator)) {
      setSelectedCollaborators(selectedCollaborators.filter((userId) => userId !== collaborator.userId));
    } else {
      setSelectedCollaborators([...selectedCollaborators, collaborator]);
    }
  };

  const handleAddButtonClick = async () => {
    // Add your logic to handle adding collaborators
    console.log("Selected Collaborators:", selectedCollaborators);
    const collaboratorIds = selectedCollaborators.map(collaborator => collaborator.userId);

    const res = await contestApi.addCollaborator(contest.id,collaboratorIds);
    showSuccess(
        "Invitation sent successfully", res
      );
    //setContestCollaborators([...ContestCollaborators, ...selectedCollaborators]);

    setSelectedCollaborators([]);

    // Additional logic can be added here to handle the selected collaborators
    handleListToggle();
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <button
        className="flex flex-row gap-2 justify-center items-center bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-semibold"
        onClick={handleListToggle}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
        <h1>INVITE</h1>
      </button>

      <div className="max-h-[60vh] overflow-y-auto">
        {ContestCollaborators?.map((setter) => (
          <div
            key={setter.id}
            className="flex flex-row items-center mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer relative"
          >
            <img
              src={setter.image}
              alt={`${setter.username}'s profile`}
              className="ml-4 w-10 h-10 rounded-full"
            />
            <span className="ml-4 font-medium text-gray-800 text-lg hover:underline">
              {setter.username}
            </span>

            {/* Conditionally render the "Requested" text */}
            {setter.status !== 'accepted' && (
              <div className="absolute bottom-0 right-1">
                <span className="text-xs text-red-500">Requested</span>
              </div>
            )}
          </div>
        ))}
      </div>


      {isListOpen && (
        <div className="max-h-[60vh] overflow-y-auto">
          {collaborators.map((setter) => (
            <div
              key={setter.id}
              className="flex flex-row items-center mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer"
            >
              <Checkbox
                checked={selectedCollaborators.includes(setter)}
                onChange={() => handleCollaboratorSelect(setter)}
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
          <div className="mt-6">
            <button
              onClick={handleAddButtonClick}
              className="w-full flex flex-row gap-2 justify-center items-center bu-button-primary rounded-lg px-7 py-3.5 text-center text-lg font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaborators;
