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
  faFloppyDisk,
  faEdit,
  faPenToSquare,
  faCopy,
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import AddTask from "@mui/icons-material/AddTask";
import { getTimeStamp } from "../../services/dateUtil";
import { SelectionField2, SelectionField3 } from "../InputFields";
export default function SetterArticleCard({
  id,
  name,
  path,
  deleteAction,
  isLive,
  canvas,
  article,
  setArticle,
  isEdit,
  timestamp,
  seriesList,
  topicList,
  isApproved,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full relative" key={id}>
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 justify-between"
        }
      >
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => {
            setLoading(true);
            navigate(`/setter/articles/${id}`);
          }}
        >
          <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title w-75% cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {name}
          </h5>

          {canvas && (
            <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
              <FontAwesomeIcon icon={faTag} />
              <h3 className="bu-text-primary">{canvas}</h3>
            </div>
          )}
        </div>

        <div className="flex justify-between items-end">
          <div className="bu-text-subtitle">{getTimeStamp(timestamp)}</div>
          <div className="flex flex-row ">
            <div className="w-1/3 flex items-center justify-center">
              <IconButton
                onClick={() => navigate(`/setter/articles/${id}/edit`)}
              >
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                </div>
              </IconButton>
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <IconButton
              // onClick={() => cloneProblem(id)}
              >
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faCopy} size="sm" />
                </div>
              </IconButton>
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <IconButton onClick={() => setOpen(true)} disabled={isApproved}>
                <div
                  className={`flex items-center bu-text-${
                    isApproved ? "disabled" : "primary"
                  }`}
                >
                  <FontAwesomeIcon icon={faTrashCan} size="sm" />
                </div>
              </IconButton>
            </div>
          </div>
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
