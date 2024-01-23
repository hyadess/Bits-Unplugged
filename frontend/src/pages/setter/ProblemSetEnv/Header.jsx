import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { faExpand, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setLoading, showSuccess } from "../../../App";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProblemContext } from "../../../store/ProblemContextProvider";
import { problemApi } from "../../../api";

const Header = ({ backupProblem }) => {
  const navigate = useNavigate();
  const { state: problem, dispatch } = useProblemContext();
  const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  const updateCanvas = async () => {
    dispatch({
      type: "UPDATE_CHECKER_CANVAS",
      payload: deepCopy(problem.canvasData),
    });
    backupProblem.current.canvasData = problem.canvasData;
    const res = await problemApi.updateProblem(problem.id, {
      canvasId: problem.canvasId,
      canvasData: problem.canvasData,
      editOptions: problem.editOptions,
      previewOptions: problem.previewOptions,
      checkerCode: problem.checkerCode,
      checkerCanvas: problem.checkerCanvas,
    });
    if (res.success) {
      // console.log(res);
    }
  };

  // const updateAll = async (data) => {
  const saveAll = async () => {
    await problemApi.updateProblem(problem.id, {
      title: problem.title,
      statement: problem.statement,
    });
    await updateCanvas(); // solutionChecker
    await problemApi.updateProblem(problem.id, {
      checkerCode: problem.checkerCode,
      checkerCanvas: problem.checkerCanvas,
    });
  };

  // const updateAll = async (problemid) => {
  const updateAll = async () => {
    // Save all with a new api call
    const res = await problemApi.submitProblem(problem.id); // Or send through this
    if (res.success) {
      showSuccess("Problem submitted for approval", res);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl items-center py-4 pt-8 md:grid md:grid-cols-2">
      <div className="flex flex-row items-center md:mt-0 w-full text-center text-5xl font-extrabold tracking-tight md:text-left bu-text-title">
        {problem?.title?.length == 0 ? "Untitled" : problem.title}
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
                navigate(`/problems/${problem.id}/preview`);
              }}
            >
              <FontAwesomeIcon icon={faExpand} />
            </div>
          </IconButton>
        </Tooltip>
        {/* <Tooltip
      title={<h1 className="text-lg text-white">Delete</h1>}
      placement="top"
      // TransitionComponent={Zoom}
      arrow
      size="large"
    >
      <IconButton>
        <div
          data-tooltip-target="tooltip-default"
          className="bu-text-primary flex cursor-pointer items-center text-3xl"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </IconButton>
    </Tooltip> */}

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
              // onClick={() => setOpen(true)}
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

export default Header;
