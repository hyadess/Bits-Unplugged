import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Zoom } from "@mui/material";
import ImageLoader from "../ImageLoader";
import styled from "@emotion/styled";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: "10px",
  // borderRadius: 5,
  overflow: "hidden",
  backgroundColor: "#EDEDED",
  // theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  // theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  "& .MuiLinearProgress-bar": {
    borderRadius: "6px",
    // backgroundColor: theme.palette.mode === "light" ? "#1976d2" : "#308fe8",
    backgroundColor: "rgba(236, 172, 59, 0.5)", // make it lighter
    // make border color darker then background
    borderColor: "#C98C17",
    borderWidth: 2,
    // transform: "translateX(40px)",
  },
}));

/* Rectangle 89290 */

const TopicCard = ({ id, name, image, path, action }) => {
  const navigate = useNavigate();
  const [solved, setSolved] = useState(0);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let tmp = Math.round(Math.random() * 50);
    let tmp2 = tmp + Math.round(Math.random() * 50);
    setSolved(tmp);
    setTotal(tmp2);
    setProgress(Math.round((tmp / tmp2) * 100));
  }, []);

  useEffect(() => {
    console.log(
      `box-border w-[${Math.round(
        (solved / total) * 100
      )}%] h-[9.42px] left-[368.13px] top-[344.46px] border-[1px] border-[#C98C17] rounded-[6px]`
    );
  }, [solved, total]);

  return (
    <Zoom in={true}>
      <div
        className="flex flex-col items-center w-full h-[10.5rem] cursor-pointer"
        onClick={() => navigate(path)}
      >
        <div className="flex flex-row border rounded-lg shadow-md bu-card-primary h-full w-full p-5">
          <div className="flex flex-col gap-1 justify-between w-[70%]">
            {/* <h5 className="mt-4 text-2xl text-center font-bold tracking-tight bu-text-primary px-3">
              {id}
            </h5> */}
            <div className="flex flex-col gap-1">
              <h5 className="flex justify-start p-0 text-3xl text-center font-bold bu-text-title">
                {name}
              </h5>
              <div className="bu-text-subtitle">{total} problems</div>
            </div>
            {/* <div className="w-full flex items-center justify-center cursor-pointer">
              <div
                onClick={() => navigate(path)}
                className="inline-flex my-8 items-center  font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-secondary"
              >
                <h5 className="text-lg text-center font-bold tracking-tight bu-text-primary">
                  {action}
                </h5>
              </div>
            </div> */}

            <div className="flex flex-col gap-1">
              <h5 className="bu-text-subtitle text-sm">
                {solved}/{total} problems solved
              </h5>
              <div className="w-full h-[8.86px] left-[367.76px] top-[344.82px] bg-[#EDEDED] rounded-[6px]">
                {progress && (
                  <div
                    className={`box-border h-[9.42px] border-[1px] rounded-[6px]`}
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        progress > 70
                          ? "rgba(13, 158, 45, 0.4)"
                          : progress > 30
                            ? "rgba(236, 172, 59, 0.4)"
                            : "rgba(243, 44, 44, 0.4)",
                      borderColor:
                        progress > 70
                          ? "rgb(47, 113, 65)"
                          : progress > 30
                            ? "#C98C17"
                            : "#C91717",
                    }}
                  ></div>
                )}
              </div>
              {/* <BorderLinearProgress
                variant="determinate"
                value={Math.round(Math.random() * 100)}
              /> */}
            </div>
          </div>
          <div className="flex items-center justify-end w-30%">
            <ImageLoader
              src={
                image
                  ? image
                  : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
              }
              alt=""
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default TopicCard;
