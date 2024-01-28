import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { faExpand, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setLoading, showSuccess } from "../../../App";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContestContext } from "../../../store/ContestContextProvider"; // Assuming you have a context for the contest state
import { contestApi } from "../../../api";

const ContestHeader = () => {
  const navigate = useNavigate();
  const { state: contest, dispatch } = useContestContext(); // Assuming you have a context for the contest state
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const updateCanvas = async () => {
    // Add logic to update canvas data for the contest
  };

  const saveAll = async () => {
    await updateCanvas();
    const result = await contestApi.updateContest(contest.id, {
      title: contest.title,
      // Add other properties as needed for the contest
    });
    showSuccess("Contest saved successfully", result);
  };

  const updateAll = async () => {
    // Add logic to update all contest details and submit for approval
  };

  return (
    <div className="mx-auto max-w-screen-2xl items-center py-4 pt-8 md:grid md:grid-cols-2">
      <div className="flex flex-row items-center md:mt-0 w-full text-center text-5xl font-extrabold tracking-tight md:text-left bu-text-title">
        {contest?.title?.length === 0 ? "Untitled Contest" : contest.title}
      </div>
      <div className="flex flex-row justify-end">
        <Tooltip
          title={<h1 className="text-lg text-white">Preview</h1>}
          placement="top"
          arrow
          size="large"
        >
          <IconButton>
            <div
              data-tooltip-target="tooltip-default"
              className="bu-text-primary flex cursor-pointer items-center text-3xl"
              onClick={() => {
                setLoading(true);
                navigate(`/contests/${contest.id}/preview`);
              }}
            >
              <FontAwesomeIcon icon={faExpand} />
            </div>
          </IconButton>
        </Tooltip>

        <Tooltip
          title={<h1 className="text-lg text-white">Save all</h1>}
          placement="top"
          arrow
          size="large"
        >
          <IconButton>
            <div
              data-tooltip-target="tooltip-default"
              className="bu-text-primary flex cursor-pointer items-center text-3xl"
              onClick={saveAll}
            >
              <FontAwesomeIcon icon={faSave} />
            </div>
          </IconButton>
        </Tooltip>

        <Tooltip
          title={<h1 className="text-lg text-white">Publish</h1>}
          placement="top"
          arrow
          size="large"
        >
          <IconButton>
            <div
              data-tooltip-target="tooltip-default"
              className="bu-text-primary flex cursor-pointer items-center text-3xl"
              onClick={updateAll}
            >
              <FontAwesomeIcon icon={faUpload} />
            </div>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContestHeader;
