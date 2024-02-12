import React, { useState, useEffect } from "react";
import { useCountdown } from "../hooks/useCountDown";
import { contestApi } from "../api/";
import { useParams } from "react-router-dom";

const ExpiredNotice = ({ flag }) => {
  useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <div className="expired-notice-container">
      <div className="expired-notice">
        {flag === "start" ? <span>Test Started</span> : <span>Test Ended</span>}
      </div>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  useEffect(() => {}, [seconds]);

  return (
    <div className="absolute top-8 right-5 flex justify-between sm:px-4 justify-center items-center gap-10">
      <div className="flex flex-col justify-center items-center gap-3">
        <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
          {hours < 10 ? `0${hours}` : hours}
        </span>
        <span className="text-sm text-[#4b4b4a] font-bold">
          {hours === 1 ? "Hour" : "Hours"}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
          {minutes < 10 ? `0${minutes}` : minutes}
        </span>
        <span className="text-sm text-[#4b4b4a] font-bold">
          {minutes === 1 ? "Minute" : "Minutes"}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
        <span className="text-sm text-[#4b4b4a] font-bold">
          {seconds === 1 ? "Second" : "Seconds"}
        </span>
      </div>
    </div>
  );
};



const CountdownTimer = ({ targetDate, flag, EndAction }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  

 // Fetch leaderboard only once on component mount

  if (days + hours + minutes + seconds <= 0) {
    EndAction();
    
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
