import React, { useEffect } from "react";
import { useCountdown } from "../hooks/useCountDown";
import { useLocation, useNavigate } from "react-router-dom";

import "./Timer.scss";

const ExpiredNotice = ({ flag }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const refreshPage = () => {
    // let currentPath = location.pathname;
    navigate(0);
    // history.replace(currentPath);
  };
  useEffect(() => {
    if (flag == "start") {
      //  refresh page
      refreshPage();
    }
  }, [flag]);
  return (
    <div className="expired-notice-container">
      <div className="expired-notice">
        {flag === "start" ? (
          // <span>Contest Started</span>
          <></>
        ) : (
          <span>Contest Ended</span>
        )}
      </div>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex sm:px-4 justify-center items-center gap-10 h-[7rem]">
      {!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && (
        <>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bu-button-primary text-[#112D32] text-3xl font-semibold rounded-md">
              {hours < 10 ? `0${hours}` : hours}
            </span>
            <span className="text-sm text-[#4b4b4a] font-bold">
              {hours <= 1 ? "Hour" : "Hours"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bu-button-primary text-[#112D32] text-3xl font-semibold rounded-md">
              {minutes < 10 ? `0${minutes}` : minutes}
            </span>
            <span className="text-sm text-[#4b4b4a] font-bold">
              {minutes <= 1 ? "Minute" : "Minutes"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bu-button-primary text-[#112D32] text-3xl font-semibold rounded-md">
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span className="text-sm text-[#4b4b4a] font-bold">
              {seconds === 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const CountdownTimer = ({ targetDate, flag, EndAction }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  useEffect(() => {
    console.log("inside timer", targetDate);
  }, []);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice flag={flag} />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
