import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading, showSuccess } from "../../App";
import { problemApi } from "../../api";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleCheck,
  // faCircleXmark,
  faR,
  faTag,
  fas,
  fa,
  faS,
  faTrashCan,
  faCheckCircle,
  faXmark,
  faCheck,
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Avatar, IconButton } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddTask from "@mui/icons-material/AddTask";
import { getTimeStamp } from "../../services/dateUtil";
export default function PendingProblemCard({
  id,
  name,
  path,
  deleteAction,
  isLive,
  canvas,
  setProblem,
  isEdit,
  timestamp,
  reject,
  setter,
}) {
  const [open, setOpen] = useState(false);
  const [acceptance, setAcceptance] = useState(Math.round(Math.random() * 100));
  const [difficulty, setDifficulty] = useState(
    ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]
  );
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  const publishProblem = async () => {
    await problemApi.publishProblem(id);
  };
  const unpublishProblem = async () => {
    await problemApi.unpublishProblem(id);
  };
  return (
    <div className="w-full h-full relative" key={id}>
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 h-full justify-between"
        }
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col cursor-pointer w-[80%]">
            <h5
              className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis w-full max-w-full"
              onClick={() => {
                setLoading(true);
                navigate(`/admin/problems/${id}/preview`);
              }}
            >
              {name}
            </h5>

            {canvas && (
              <div
                className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400"
                onClick={() => {
                  setLoading(true);
                  navigate(`/admin/problems/${id}/preview`);
                }}
              >
                <FontAwesomeIcon icon={faTag} />
                <h3 className="bu-text-primary">{canvas}</h3>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 cursor-pointer">
            <Avatar
              alt={setter?.username}
              src={
                setter != null
                  ? setter.image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
              }
              onClick={() => {
                setLoading(true);
                navigate("/setter/" + setter.username);
              }}
              style={{ height: "3rem", width: "3rem" }} // Change the size here
            />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bu-text-subtitle">{getTimeStamp(timestamp)}</div>
          <h1
            className="bu-text-subtitle cursor-pointer hover:underline"
            onClick={() => {
              setLoading(true);
              navigate("/setter/" + setter.username);
            }}
          >
            @{setter.username}
          </h1>
        </div>

        {/* <div className="flex flex-row justify-center gap-2">
          <div className="w-1/3 flex items-center justify-center">
            <IconButton onClick={reject}>
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faXmark} size="sm" />
              </div>
            </IconButton>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <IconButton
              onClick={async () => {
                const res = await problemApi.approveProblem(id);
                if (res.success) {
                  showSuccess("Problem approved", res);
                }
              }}
            >
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faCheck} size="sm" />
              </div>
            </IconButton>
          </div>
        </div> */}

        <div className="flex flex-row justify-center gap-4 w-full mt-5">
          <button
            className="flex flex-row gap-2 flex-center font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-delete"
            onClick={() => {
              // const res = await problemApi.rejectProblem(id);
              // if (res.success) {
              //   showSuccess("Problem rejected", res);
              // }
              reject();
            }}
          >
            Reject
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
          <button
            className="flex flex-row gap-2 flex-center  font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
            onClick={async () => {
              const res = await problemApi.approveProblem(id);
              if (res.success) {
                showSuccess("Problem approved", res);
              }
            }}
          >
            Approve
            <FontAwesomeIcon icon={faCheck} size="sm" />
          </button>
        </div>
      </div>

      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={deleteAction}
        param={id}
      />
    </div>
  );
}
