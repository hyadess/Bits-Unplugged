import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { problemApi, userActivityApi } from "../../api";
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
export default function ArticleCard({
  id,
  name,
  path,
  rating,
  onDelete,
  isLive,
  setArticle,
  isSolved,
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 h-full cursor-pointer"
        }
        // onClick={() => {
        //   setLoading(true);
        //   navigate(path);
        // }}
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-row">
          <h5 className="text-xl md:text-2xl tracking-tight bu-text-primary w-[85%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {name}
          </h5>
          <div className="flex flex-row justify-center w-[15%]">
            <div className="w-1/3 flex items-center justify-center">
              {isLive ? (
                <IconButton
                  onClick={async () => {
                    // await topicApi.updateTopic(id, { isLive: false });
                    setArticle(id, { isLive: false });
                  }}
                >
                  <div className="flex items-center bu-text-primary">
                    <CheckCircle sx={{ fontSize: "1.5rem" }} />
                  </div>
                </IconButton>
              ) : (
                <IconButton
                  onClick={async () => {
                    // await topicApi.updateTopic(id, { isLive: true });
                    setArticle(id, { isLive: true });
                  }}
                >
                  <div className="flex items-center bu-text-subtitle">
                    <AddTask sx={{ fontSize: "1.5rem" }} />
                  </div>
                </IconButton>
              )}
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <IconButton onClick={() => setOpen(true)}>
                <div className="flex items-center bu-text-primary">
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
        onConfirm={onDelete}
        param={id}
      />
    </div>
  );
}
