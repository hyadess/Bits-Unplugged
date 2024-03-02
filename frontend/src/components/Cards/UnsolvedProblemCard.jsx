import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../ProbSetTab";
import { setLoading } from "App";
import { getTimeStamp } from "services/dateUtil";
import { faClockRotateLeft, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { DonutLarge } from "@mui/icons-material";

export default function UnsolvedProblemCard({
  idx,
  id,
  name,
  path,
  action,
  attempts,
  difficulty,
  last_tried,
  topic,
  series,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  function formatDuration(seconds) {
    let wholeHours = Math.floor(seconds / 3600);
    let remainingSeconds = seconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let finalSeconds = remainingSeconds % 60;
    return `${wholeHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${finalSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="w-full h-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 h-full"
        }
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-col cursor-pointer gap-3">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h5 className="text-xl md:text-xl font-semibold tracking-tight bu-text-primary w-4/5 cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
                {name}
              </h5>

              <div
                className={`flex flex-row items-center gap-2 ${
                  difficulty < 1100
                    ? "text-green-500 font-sm"
                    : difficulty < 1800
                      ? "text-[#FF981E] font-medium"
                      : "text-red-500 font-extrabold"
                }`}
              >
                <FontAwesomeIcon icon={faFire} />
                <h3 className={`font-semibold text-sm`}>{difficulty}</h3>
              </div>
            </div>
            {/* <div className="pl-1 flex flex-row items-center gap-1 text-[#ba3030] dark:text-blue-400 text-xs">
              <FontAwesomeIcon icon={faTag} />
              <div className="bu-text-subtitle ">{`${topic} > ${series}`}</div>
            </div> */}
            <div className="bu-text-subtitle text-xs">{`${topic} > ${series}`}</div>
          </div>
          {/* <h3 className="text-red-500 w-[10%] font-bold">{attempts}</h3> */}

          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center text-sm gap-1 bu-text-primary font-medium">
              <FontAwesomeIcon icon={faClockRotateLeft} />
              {getTimeStamp(last_tried)}
            </div>
            <div>
              <div className="text-sm text-red-500 flex flex-row gap-1 items-center font-medium">
                <TimerOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                <div className="text-sm">{formatDuration(45)}</div>
                {/* <FontAwesomeIcon icon={faClock} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
