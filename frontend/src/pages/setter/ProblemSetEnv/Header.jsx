import React, { useState, useEffect, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import ProblemController from "../../../controller/problemController";
import { faExpand, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setLoading } from "../../../App";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const problemController = new ProblemController();

const Header = ({ title, problemid, updateAll, saveAll }) => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <div className="mx-auto max-w-screen-2xl items-center py-4 pt-8 md:grid md:grid-cols-2">
      <div className="flex flex-row items-center md:mt-0 w-full text-center text-5xl font-extrabold tracking-tight md:text-left bu-text-title">
        {title.length == 0 ? "Untitled" : title}
      </div>
      <div className="flex flex-row justify-end">
        <Tooltip
          title={<h1 className="text-lg text-white">Preview</h1>}
          placement="top"
          // TransitionComponent={Zoom}
          arrow
          size="large"
        >
          <IconButton>
            <div
              data-tooltip-target="tooltip-default"
              className="bu-text-primary flex cursor-pointer items-center text-3xl"
              onClick={() => {
                setLoading(true);
                switchPath(`/problem/${problemid}/preview`);
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
          // TransitionComponent={Zoom}
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
