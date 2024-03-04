import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading, showSuccess } from "../../App";
import { contestApi, problemApi, ratingApi } from "../../api";
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
  faPersonRunning,
  faListOl,
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
  duration,
  owner,
  startDateTime,
  difficulty,
}) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(
      "Progress: ",
      Math.floor(
        ((new Date().getTime() - new Date(startDateTime).getTime()) * 100) /
          (duration * 60 * 60 * 1000)
      )
    );
  }, [startDateTime]);
  return (
    <div className="w-full h-full relative" key={id}>
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col gap-5 p-5 h-full justify-between"
        }
      >
        <div className="flex flex-col ">
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
            {new Date(startDateTime).getTime() + duration * 60 * 60 * 1000 <
            new Date().getTime() ? (
              <div className="flex flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500 text-lg"
                />
                <h1 className="text-green-500 text-lg">Completed</h1>
              </div>
            ) : new Date(startDateTime).getTime() < new Date().getTime() ? (
              <div className="flex flex-row items-center gap-1">
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  className="text-red-500 text-lg"
                />
                <h1 className="text-red-500 text-lg">Running</h1>
              </div>
            ) : (
              <div className="bu-text-subtitle">
                Scheduled at {format(startDateTime, "dd/MM/yy h.mm a")}
              </div>
            )}

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

        {new Date(startDateTime).getTime() + duration * 60 * 60 * 1000 <
        new Date().getTime() ? (
          <button
            className="flex flex-row gap-2 flex-center  font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary"
            onClick={async () => {
              const res = await ratingApi.updateAllUserRating(id);
              if (res.success) {
                console.log("Leaderboard published");
                const res2 = await contestApi.updateContest(id, {
                  status: "rated",
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faListOl} />
            Publish Leaderboard
          </button>
        ) : (
          <div className="w-full h-[2.5rem] left-[367.76px] top-[344.82px] bg-[#EDEDED] rounded-[6px]">
            {new Date(startDateTime).getTime() < new Date().getTime() && (
              <div
                className={`box-border h-full border-[1px] rounded-[6px]`}
                style={{
                  width: `${
                    100 -
                    Math.floor(
                      ((new Date().getTime() -
                        new Date(startDateTime).getTime()) *
                        100) /
                        (duration * 60 * 60 * 1000)
                    )
                  }%`,
                  backgroundColor:
                    100 -
                      Math.floor(
                        ((new Date().getTime() -
                          new Date(startDateTime).getTime()) *
                          100) /
                          (duration * 60 * 60 * 1000)
                      ) >
                    70
                      ? "rgba(13, 158, 45, 0.4)"
                      : Math.floor(
                            ((new Date().getTime() -
                              new Date(startDateTime).getTime()) *
                              100) /
                              (duration * 60 * 60 * 1000)
                          ) > 30
                        ? "rgba(236, 172, 59, 0.4)"
                        : "rgba(243, 44, 44, 0.4)",
                  borderColor:
                    100 -
                      Math.floor(
                        ((new Date().getTime() -
                          new Date(startDateTime).getTime()) *
                          100) /
                          (duration * 60 * 60 * 1000)
                      ) >
                    70
                      ? "rgb(47, 113, 65)"
                      : 100 -
                            Math.floor(
                              ((new Date().getTime() -
                                new Date(startDateTime).getTime()) *
                                100) /
                                (duration * 60 * 60 * 1000)
                            ) >
                          30
                        ? "#C98C17"
                        : "#C91717",
                }}
              ></div>
            )}
          </div>
        )}
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
