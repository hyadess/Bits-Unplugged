import React from "react";
import { useEffect } from "react";
import { useCountdown } from "../hooks/useCountdown";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

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
  return (
    <div className="show-counter">
      <a className="countdown-link">
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  );
};

const CountdownTimer = ({ targetDate, flag }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  // console.log(days, hours, minutes, seconds);
  // console.log(flag);
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
