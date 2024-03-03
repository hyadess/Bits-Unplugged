import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading, showSuccess } from "../../App";
import { articleApi, problemApi } from "../../api";
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
export default function PendingArticleCard({
  id,
  title,
  timestamp,
  reject,
  approve,
  setter,
}) {
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
                navigate(`/admin/articles/${id}`);
              }}
            >
              {title}
            </h5>
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

        <div className="flex flex-row justify-center gap-4 w-full mt-5">
          <button
            className="flex flex-row gap-2 flex-center font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-delete"
            onClick={() => setOpen(true)}
          >
            Reject
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
          <button
            className="flex flex-row gap-2 flex-center  font-medium rounded-lg text-lg px-7 py-2 text-center w-full bu-button-primary"
            onClick={approve}
          >
            Approve
            <FontAwesomeIcon icon={faCheck} size="sm" />
          </button>
        </div>
      </div>
      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={reject}
        param={id}
      />
    </div>
  );
}
