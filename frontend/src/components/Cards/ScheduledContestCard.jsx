import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading, showSuccess } from "../../App";
import { contestApi, problemApi } from "../../api";
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
import { format } from "date-fns";
export default function ScheduledContestCard({
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
  owner,
  startDateTime,
}) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
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
                navigate(`/admin/contests/${id}/preview`);
              }}
            >
              {name}
            </h5>
          </div>
          <div className="flex flex-col items-end gap-2 cursor-pointer">
            <Avatar
              alt={owner?.username}
              src={
                owner != null
                  ? owner.image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/2048px-Solid_black.svg.png"
              }
              onClick={() => {
                setLoading(true);
                navigate("/setter/" + owner.username);
              }}
              style={{ height: "3rem", width: "3rem" }} // Change the size here
            />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bu-text-subtitle">
            Scheduled at {format(startDateTime, "dd/MM/yy h.mm a")}
          </div>
          <h1
            className="bu-text-subtitle cursor-pointer hover:underline"
            onClick={() => {
              setLoading(true);
              navigate("/setter/" + owner.username);
            }}
          >
            @{owner.username}
          </h1>
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
