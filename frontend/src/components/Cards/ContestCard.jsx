import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Zoom } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  faCalendarDays,
  faDoorOpen,
  faHandPointRight,
  faPersonRunning,
  faRightToBracket,
  faTag,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading, showMessage, showToast } from "../../App";
import { getTimeStamp } from "../../services/dateUtil";
import Confirmation from "../Confirmation";
import { contestApi } from "api";
// ... (previous imports)
import { format, add } from "date-fns";
import {
  faCalendar,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { HowToReg } from "@mui/icons-material";
const ContestCard = ({
  id,
  name,
  startDate,
  endDate,
  status,
  owner,
  duration,
  updatedAt,
  registerAction,
  userID,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState(false);

  const handleButtonClick = async () => {
    navigate(`/contests/${id}`);
  };

  const handleButtonClick2 = async () => {
    if (new Date(startDate).getTime() < Date.now()) {
      showToast("Registration closed", "error");
    } else {
      const res = await contestApi.participateUpcomingContest(id);
      if (res.success) {
        setRegistered(true);
        showToast("Successfully registered to " + name, "success");
      }
    }
  };

  const getRegistrationInfo = async () => {
    const res = await contestApi.isRegistered(id);
    console.log("register", id, res);
    if (res.data.length > 0) setRegistered(true);
    else setRegistered(false);
  };

  useEffect(() => {
    getRegistrationInfo();
    setLoading(false);
  }, []);

  function formatDuration(hours) {
    let wholeHours = Math.floor(hours);
    let minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <Zoom in={true}>
      <div className="w-full h-full" key={id}>
        <div className="border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 gap-3">
          <div className="flex flex-row justify-between items-center">
            <div
              className="cursor-pointer"
              // onClick={() => navigate(`/contests/${id}/preview`)}
            >
              <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title">
                {name}
              </h5>
            </div>
            {/* {
              // running contest
              new Date(startDate).getTime() < Date.now() &&
                new Date(endDate).getTime() > Date.now() && (
                  <div className="bu-text-primary text-xl">
                    <FontAwesomeIcon icon={faPersonRunning} />
                  </div>
                )
            } */}
            <div className="bu-text-primary">
              {isRegistered && <HowToReg />}
            </div>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-2 bu-text-primary items-center">
              {/* <FontAwesomeIcon icon={faCalendarDays} /> */}

              {/* https://www.iconfinder.com/icons/6351901/appointment_calendar_checklist_date_event_schedule_time_icon */}
              <svg
                fill="none"
                height="28"
                viewBox="0 0 28 28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M7.79167 3.47826C7.79167 3.21412 8.0062 3 8.27083 3H9.22917C9.4938 3 9.70833 3.21412 9.70833 3.47826V5.86957H19.2917V3.47826C19.2917 3.21412 19.5062 3 19.7708 3H20.7292C20.9938 3 21.2083 3.21412 21.2083 3.47826V5.86957H24.0833C25.1419 5.86957 26 6.72606 26 7.78261V21C26 19.4019 25.2503 17.9789 24.0833 17.0636V12.5652H4.91667V22.1304C4.91667 22.6587 5.34573 23.087 5.875 23.087H16.455C16.8043 23.8464 17.3383 24.5032 17.9995 25H4.91667C3.85812 25 3 24.1435 3 23.087V7.78261C3 6.72606 3.85812 5.86957 4.91667 5.86957H7.79167V3.47826ZM9.70833 7.78261H19.2917V8.73913C19.2917 9.00327 19.5062 9.21739 19.7708 9.21739H20.7292C20.9938 9.21739 21.2083 9.00327 21.2083 8.73913V7.78261H23.125C23.6543 7.78261 24.0833 8.21086 24.0833 8.73913V10.6522H4.91667V8.73913C4.91667 8.21086 5.34573 7.78261 5.875 7.78261H7.79167V8.73913C7.79167 9.00327 8.0062 9.21739 8.27083 9.21739H9.22917C9.4938 9.21739 9.70833 9.00327 9.70833 8.73913V7.78261Z"
                  fill="black"
                  fillRule="evenodd"
                />
                <path
                  d="M24.0005 25C25.2147 24.0878 26 22.6356 26 21V23.087C26 24.1435 25.1419 25 24.0833 25H24.0005Z"
                  fill="black"
                />
                <path
                  clipRule="evenodd"
                  d="M21 16.75C18.6528 16.75 16.75 18.6528 16.75 21C16.75 23.3472 18.6528 25.25 21 25.25C23.3472 25.25 25.25 23.3472 25.25 21C25.25 18.6528 23.3472 16.75 21 16.75ZM15.25 21C15.25 17.8244 17.8244 15.25 21 15.25C24.1756 15.25 26.75 17.8244 26.75 21C26.75 24.1756 24.1756 26.75 21 26.75C17.8244 26.75 15.25 24.1756 15.25 21Z"
                  fill="black"
                  fillRule="evenodd"
                />
                <path
                  d="M18.5007 20.3792C18.6959 20.184 19.0125 20.184 19.2078 20.3792L20.6216 21.793C20.8168 21.9883 20.8168 22.3049 20.6216 22.5001C20.4263 22.6954 20.1097 22.6954 19.9145 22.5001L18.5007 21.0863C18.3054 20.8911 18.3054 20.5745 18.5007 20.3792Z"
                  fill="black"
                />
                <path
                  d="M23.3253 19.0976C23.13 18.9023 22.8135 18.9023 22.6182 19.0976L19.9228 21.793C19.7275 21.9883 19.7275 22.3049 19.9228 22.5001C20.118 22.6954 20.4346 22.6954 20.6299 22.5001L23.3253 19.8047C23.5206 19.6094 23.5206 19.2929 23.3253 19.0976Z"
                  fill="black"
                />
              </svg>
              {startDate &&
                `${format(new Date(startDate), "MMM d, yyyy 'at' h.mm a")}`}
            </div>
            <div className="text-xl bu-text-primary flex flex-row gap-1 items-center">
              <TimerOutlinedIcon />
              <div className="text-lg">{formatDuration(duration)}</div>
              {/* <FontAwesomeIcon icon={faClock} /> */}
            </div>
          </div>

          <div className="flex flex-row w-full justify-end gap-5 items-center">
            <div className="w-full">
              {new Date(startDate).getTime() > Date.now() ? (
                isRegistered ? (
                  <div className="bg-gray-300 bu-text-subtitle flex flex-row gap-1 justify-center items-center rounded-lg px-5 py-2.5 text-center text-lg font-medium w-full pointer-events-none">
                    Registered
                  </div>
                ) : (
                  <button
                    className="bu-button-save flex flex-row gap-1 justify-center items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium w-full cursor-pointer"
                    onClick={async () => await handleButtonClick2()}
                  >
                    <HowToReg />
                    <h5 className="bu-text-primary text-center text-lg font-bold tracking-tight">
                      Register
                    </h5>
                  </button>
                )
              ) : new Date(endDate).getTime() > Date.now() ? (
                <div className=" text-red-500 flex flex-row gap-1 justify-center items-center rounded-lg px-5 py-2.5 text-center text-lg font-medium w-full pointer-events-none">
                  <FontAwesomeIcon icon={faPersonRunning} />
                  Running
                </div>
              ) : (
                <div className="text-green-500 flex flex-row gap-1 justify-center items-center rounded-lg px-5 py-2.5 text-center text-lg font-medium w-full pointer-events-none">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Finished
                </div>
              )}
            </div>

            <div
              onClick={() => handleButtonClick()}
              className="bu-button-primary flex flex-row gap-1 justify-center items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium w-full cursor-pointer"
            >
              <div className="text-lg">
                <FontAwesomeIcon icon={faDoorOpen} />
              </div>
              {new Date(startDate).getTime() < Date.now() &&
              new Date(endDate).getTime() > Date.now() &&
              isRegistered ? (
                <h5 className="bu-text-primary text-center text-lg font-bold tracking-tight">
                  Participate
                </h5>
              ) : (
                <h5 className="bu-text-primary text-center text-lg font-bold tracking-tight">
                  Enter
                </h5>
              )}
            </div>
          </div>
        </div>

        <Confirmation
          open={open}
          setOpen={setOpen}
          onConfirm={registerAction}
          param={id}
        />
      </div>
    </Zoom>
  );
};

export default ContestCard;
