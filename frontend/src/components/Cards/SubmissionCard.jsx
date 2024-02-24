import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { getTimeStamp } from "services/dateUtil";
import ImageLoader from "components/ImageLoaders/ImageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { Divider } from "@mui/material";
export default function SubmissionCard({
  submissionId,
  idx,
  problem_name,
  verdict,
  path,
  timestamp,
  image,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  return (
    <div class="items-center w-full">
      <div
        class={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-4 items-center gap-5 justify-between"
        }
      >
        <div className={`w-full h-52 flex-center`}>
          <ImageLoader
            src={
              image
                ? image
                : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
            className={"max-h-52"}
          />
        </div>
        <Divider sx={{ bgcolor: "black", width: "100%", height: "3px" }} />
        {/* <h5 class="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}
        <div className="flex flex-row justify-between items-start w-full">
          <h5
            class="text-sm md:text-lg tracking-tight bu-text-subtitle flex-center"
            // onClick={() => {
            //   setLoading(true);
            //   navigate(path);
            // }}
          >
            {getTimeStamp(timestamp)}
          </h5>
          <div className="text-center text-5xl font-bold">
            {verdict === "Wrong answer" ? (
              <FontAwesomeIcon icon={faCircleXmark} color="red" />
            ) : (
              <FontAwesomeIcon icon={faCircleCheck} color="green" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
